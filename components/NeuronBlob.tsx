"use client";

/* eslint-disable react-hooks/immutability, react-hooks/set-state-in-effect */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { NeuronBlobFallback } from "./NeuronBlobFallback";

type Spring = { a: number; b: number; rest: number };

function useNeuronGeometry(subdivisions = 3) {
  return useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.4, subdivisions);
    geo.deleteAttribute("normal");
    geo.deleteAttribute("uv");
    // merge duplicate vertices so springs are unique per edge
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const verts: THREE.Vector3[] = [];
    const indexMap: number[] = [];
    const epsilon = 1e-4;
    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      const found = verts.findIndex((w) => w.distanceTo(v) < epsilon);
      if (found >= 0) indexMap.push(found);
      else {
        indexMap.push(verts.length);
        verts.push(v);
      }
    }
    const triCount = posAttr.count / 3;
    const indices: number[] = [];
    for (let t = 0; t < triCount; t++) {
      indices.push(
        indexMap[t * 3],
        indexMap[t * 3 + 1],
        indexMap[t * 3 + 2],
      );
    }
    // build springs (unique edges)
    const seen = new Set<string>();
    const springs: Spring[] = [];
    const key = (a: number, b: number) => (a < b ? `${a}_${b}` : `${b}_${a}`);
    for (let t = 0; t < triCount; t++) {
      const i0 = indices[t * 3];
      const i1 = indices[t * 3 + 1];
      const i2 = indices[t * 3 + 2];
      [
        [i0, i1],
        [i1, i2],
        [i2, i0],
      ].forEach(([a, b]) => {
        const k = key(a, b);
        if (!seen.has(k)) {
          seen.add(k);
          springs.push({
            a,
            b,
            rest: verts[a].distanceTo(verts[b]),
          });
        }
      });
    }
    const restPositions = verts.map((v) => v.clone());
    const restRadii = verts.map((v) => v.length());
    const restVolume = (4 / 3) * Math.PI * 1.4 * 1.4 * 1.4;
    // expanded buffer geometry for rendering (vertices duplicated per face for flat normals)
    const renderGeo = new THREE.BufferGeometry();
    const flatPositions = new Float32Array(triCount * 9);
    renderGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(flatPositions, 3),
    );
    renderGeo.computeVertexNormals();
    return {
      verts,
      restPositions,
      restRadii,
      restVolume,
      springs,
      indices,
      triCount,
      renderGeo,
      flatPositions,
    };
  }, [subdivisions]);
}

function Blob({ accent }: { accent: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const dendriteRef = useRef<THREE.Group>(null);
  const {
    verts,
    restPositions,
    restRadii,
    springs,
    indices,
    triCount,
    renderGeo,
    flatPositions,
  } = useNeuronGeometry(3);

  // physics state
  const positions = useRef(verts.map((v) => v.clone()));
  const prev = useRef(verts.map((v) => v.clone()));
  const acc = useRef(verts.map(() => new THREE.Vector3()));

  const { camera, gl } = useThree();
  const pointer = useRef({ x: 0, y: 0, active: false });
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const probe = useMemo(
    () =>
      new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 16, 16),
        new THREE.MeshBasicMaterial({ visible: false }),
      ),
    [],
  );

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.current.active = true;
    };
    const onLeave = () => (pointer.current.active = false);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [gl]);

  useFrame((state, deltaRaw) => {
    const dt = Math.min(deltaRaw, 0.033);
    const pos = positions.current;
    const prv = prev.current;
    const a = acc.current;

    // pointer impulse via raycast against probe sphere
    if (pointer.current.active) {
      ray.setFromCamera(
        new THREE.Vector2(pointer.current.x, pointer.current.y),
        camera,
      );
      const hit = ray.intersectObject(probe, false)[0];
      if (hit) {
        const p = hit.point;
        const strength = 14;
        const radius = 0.9;
        for (let i = 0; i < pos.length; i++) {
          const d = pos[i].distanceTo(p);
          if (d < radius) {
            const falloff = Math.exp(-(d * d) / (radius * radius * 0.5));
            const dir = pos[i].clone().sub(p).normalize();
            // push inward (toward center) for "press" feel
            const inward = pos[i].clone().multiplyScalar(-1).normalize();
            const force = inward
              .multiplyScalar(0.6)
              .add(dir.multiplyScalar(0.4))
              .multiplyScalar(strength * falloff);
            a[i].add(force);
          }
        }
      }
    }

    // springs
    const stiffness = 220;
    for (const s of springs) {
      const pa = pos[s.a];
      const pb = pos[s.b];
      const delta = pb.clone().sub(pa);
      const dist = delta.length() || 1e-5;
      const diff = (dist - s.rest) / dist;
      const f = delta.multiplyScalar(stiffness * diff * 0.5);
      a[s.a].add(f);
      a[s.b].add(f.clone().multiplyScalar(-1));
    }

    // shape-preservation: pull each vertex toward its rest radius along its outward normal
    const shapeK = 8;
    for (let i = 0; i < pos.length; i++) {
      const dir = pos[i].clone().normalize();
      const target = dir.multiplyScalar(restRadii[i]);
      const restoring = target.sub(pos[i]).multiplyScalar(shapeK);
      a[i].add(restoring);
      // pull toward rest position too (lower weight) to avoid drift
      const toRest = restPositions[i]
        .clone()
        .sub(pos[i])
        .multiplyScalar(0.6);
      a[i].add(toRest);
    }

    // verlet integrate w/ damping
    const damping = 0.86;
    for (let i = 0; i < pos.length; i++) {
      const vel = pos[i]
        .clone()
        .sub(prv[i])
        .multiplyScalar(damping);
      const next = pos[i].clone().add(vel).add(a[i].clone().multiplyScalar(dt * dt));
      prv[i].copy(pos[i]);
      pos[i].copy(next);
      a[i].set(0, 0, 0);
    }

    // build flat-shaded buffer
    for (let t = 0; t < triCount; t++) {
      const i0 = indices[t * 3];
      const i1 = indices[t * 3 + 1];
      const i2 = indices[t * 3 + 2];
      const p0 = pos[i0];
      const p1 = pos[i1];
      const p2 = pos[i2];
      const o = t * 9;
      flatPositions[o] = p0.x;
      flatPositions[o + 1] = p0.y;
      flatPositions[o + 2] = p0.z;
      flatPositions[o + 3] = p1.x;
      flatPositions[o + 4] = p1.y;
      flatPositions[o + 5] = p1.z;
      flatPositions[o + 6] = p2.x;
      flatPositions[o + 7] = p2.y;
      flatPositions[o + 8] = p2.z;
    }
    renderGeo.attributes.position.needsUpdate = true;
    renderGeo.computeVertexNormals();
    renderGeo.computeBoundingSphere();

    // gentle idle spin
    if (meshRef.current && !pointer.current.active) {
      meshRef.current.rotation.y += dt * 0.15;
      meshRef.current.rotation.x += dt * 0.05;
    }
    if (dendriteRef.current && meshRef.current) {
      dendriteRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  // dendrites — fixed lines from blob center going outward, swaying via noise
  const dendriteCount = 7;
  const dendrites = useMemo(() => {
    return Array.from({ length: dendriteCount }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dendriteCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi),
      );
    });
  }, []);

  return (
    <group>
      <primitive object={probe} />
      <mesh ref={meshRef} geometry={renderGeo} castShadow>
        <meshPhysicalMaterial
          color="#f5f5f0"
          emissive={accent}
          emissiveIntensity={0.15}
          roughness={0.25}
          metalness={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.3}
          transmission={0.35}
          thickness={1.2}
          ior={1.35}
          flatShading
        />
      </mesh>
      <group ref={dendriteRef}>
        {dendrites.map((d, i) => {
          const start = d.clone().multiplyScalar(1.35);
          const end = d.clone().multiplyScalar(2.6);
          const geom = new THREE.BufferGeometry().setFromPoints([start, end]);
          return (
            <line key={i}>
              <primitive object={geom} attach="geometry" />
              <lineBasicMaterial color="#0a0a0a" linewidth={2} />
            </line>
          );
        })}
      </group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color={accent} />
    </group>
  );
}

export default function NeuronBlob() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    const hasGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!c.getContext("webgl2") || !!c.getContext("webgl");
      } catch {
        return false;
      }
    })();
    if (!reduced && !small && hasGL) setEnabled(true);
  }, []);

  if (!enabled) {
    return <NeuronBlobFallback />;
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Blob accent="#e63946" />
      </Canvas>
    </div>
  );
}

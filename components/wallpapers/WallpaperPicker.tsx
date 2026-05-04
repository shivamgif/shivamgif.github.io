"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AxonRivers } from "./AxonRivers";

function WallpaperFallback() {
  return <div className="h-full w-full bg-black" />;
}

const wallpapers = [
  {
    name: "Axon Rivers",
    Component: AxonRivers,
  },
  {
    name: "Marble Resin",
    Component: dynamic(() => import("./MarbleResin").then((mod) => mod.MarbleResin), {
      ssr: false,
      loading: WallpaperFallback,
    }),
  },
  {
    name: "Neural Scope",
    Component: dynamic(() => import("./NeuralScope").then((mod) => mod.NeuralScope), {
      ssr: false,
      loading: WallpaperFallback,
    }),
  },
  {
    name: "Mycelium Net",
    Component: dynamic(() => import("./MyceliumNet").then((mod) => mod.MyceliumNet), {
      ssr: false,
      loading: WallpaperFallback,
    }),
  },
  {
    name: "Liquid Chrome",
    Component: dynamic(() => import("./LiquidChrome").then((mod) => mod.LiquidChrome), {
      ssr: false,
      loading: WallpaperFallback,
    }),
  },
];

export default function WallpaperPicker() {
  const [active, setActive] = useState(0);
  const ActiveWallpaper = wallpapers[active].Component;

  useEffect(() => {
    const id = window.setTimeout(() => {
      setActive(Math.floor(Math.random() * wallpapers.length));
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden bg-black">
      <ActiveWallpaper />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,transparent,rgba(0,0,0,.18)_48%,rgba(0,0,0,.56))]" />
    </div>
  );
}

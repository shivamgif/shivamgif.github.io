"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only render on devices with a precise pointer; globals.css scopes
    // `cursor: none` to the same media query.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const wrap = wrapRef.current;
    const dot = dotRef.current;
    if (!wrap || !dot) return;

    const handleMouseMove = (e: MouseEvent) => {
      wrap.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      wrap.style.opacity = "1";
    };
    const handleMouseDown = () => {
      dot.style.transform = "translate3d(-50%, -50%, 0) scale(0.8)";
    };
    const handleMouseUp = () => {
      dot.style.transform = "translate3d(-50%, -50%, 0) scale(1)";
    };
    const handleMouseLeave = () => {
      wrap.style.opacity = "0";
    };
    const handleMouseEnter = () => {
      wrap.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden [@media(pointer:fine)]:block"
      style={{ transform: "translate3d(-100px, -100px, 0)", opacity: 0 }}
    >
      <div
        ref={dotRef}
        className="rounded-full bg-white mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          width: "100px",
          height: "100px",
          transform: "translate3d(-50%, -50%, 0) scale(1)",
        }}
      />
    </div>
  );
}

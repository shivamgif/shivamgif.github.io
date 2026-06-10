"use client";

import { useEffect, useRef, useState } from "react";

export function ProjectIframe({
  url,
  fallbackSrc,
  blockedLabel,
}: {
  url: string;
  fallbackSrc?: string;
  blockedLabel: string;
}) {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const holderRef = useRef<HTMLDivElement>(null);

  // Only mount the third-party iframe once the card scrolls near the viewport.
  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(() => {
      if (!loaded) setBlocked(true);
    }, 4000);
    return () => window.clearTimeout(t);
  }, [visible, loaded]);

  if (blocked) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--color-yellow)] p-5 text-center">
        {fallbackSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fallbackSrc}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="brut-border brut-shadow bg-white p-6 font-mono text-sm font-black uppercase"
          >
            <span className="block text-2xl">Preview blocked</span>
            <span className="mt-3 block">{blockedLabel}</span>
            <span className="mt-4 block bg-[var(--color-ink)] px-4 py-2 text-[var(--color-paper)]">
              Open site ↗
            </span>
          </a>
        )}
      </div>
    );
  }

  return (
    <div ref={holderRef} className="h-full w-full bg-white">
      {visible && (
        <iframe
          src={url}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full bg-white"
          title={`Live preview of ${url}`}
        />
      )}
    </div>
  );
}

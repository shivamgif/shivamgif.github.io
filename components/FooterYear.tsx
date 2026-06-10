"use client";

import { useSyncExternalStore } from "react";

// Static export bakes the server snapshot at build time; the client
// snapshot keeps the year current without a rebuild.
const BUILD_YEAR = 2026;
const subscribe = () => () => {};

export function FooterYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR
  );

  return <>{year}</>;
}

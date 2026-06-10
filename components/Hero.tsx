"use client";

import type { Dict } from "@/lib/i18n";
import WallpaperPicker from "./wallpapers/WallpaperPicker";
import Image from "next/image";
import { motion } from "framer-motion";


export function Hero({ dict }: { dict: Dict }) {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-black md:min-h-[720px]">
      <div className="absolute inset-0">
        <WallpaperPicker />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.72),rgba(0,0,0,.22)_48%,rgba(0,0,0,.02))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(245,245,240,.88)_76%,var(--color-paper))]" />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[620px] max-w-6xl items-end px-6 pb-16 pt-24 md:min-h-[720px] md:pb-20">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex border-4 border-[var(--color-ink)] bg-[var(--color-accent)] px-4 py-2 font-mono text-xs font-black uppercase tracking-widest text-white shadow-[6px_6px_0_var(--color-ink)]">
            {dict.hero.role}
          </div>

          <h1 className="max-w-[10ch] text-6xl font-black leading-[0.9] text-white [text-shadow:5px_5px_0_var(--color-ink)] md:text-8xl">
            {dict.hero.name}
          </h1>

          <p className="mt-6 max-w-xl border-4 border-[var(--color-ink)] bg-[var(--color-paper)] px-5 py-4 text-xl font-black leading-tight shadow-[8px_8px_0_var(--color-accent)] md:text-2xl">
            {dict.hero.tagline}
          </p>

          <div className="mt-6 flex w-fit items-center gap-3 border-4 border-[var(--color-ink)] bg-[#ffe600] px-4 py-2 font-mono text-xs font-black uppercase text-[var(--color-ink)] shadow-[5px_5px_0_#12d8ff]">
            <span className="inline-block h-[3px] w-10 bg-[var(--color-ink)]" />
            {dict.hero.scroll} ↓
          </div>
        </div>

        <motion.div
          drag
          dragConstraints={{ left: -250, right: 120, top: -200, bottom: 120 }}
          dragElastic={0.2}
          whileDrag={{ scale: 1.1, rotate: 0 }}
          className="pointer-events-auto absolute -right-10 bottom-20 z-50 w-64 rotate-[12deg] cursor-grab active:cursor-grabbing md:right-10 md:bottom-10 md:w-96 lg:right-20"
        >
          <Image
            src="/myphoto.webp"
            alt="Sticker-style cutout photo of Shivam"
            width={800}
            height={1345}
            className="pointer-events-none h-auto w-full object-contain drop-shadow-[12px_12px_0_var(--color-ink)] md:drop-shadow-[24px_24px_0_var(--color-ink)]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

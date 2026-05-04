"use client";

export function Marquee({ text, speed = 10 }: { text: string; speed?: number }) {
  // Duplicate text to ensure smooth infinite scrolling
  const content = Array(10).fill(text).join(" • ");

  return (
    <div className="relative flex w-full overflow-hidden border-y-[6px] border-[var(--color-ink)] bg-[var(--color-neon-lime)] py-4 mix-blend-multiply">
      <div
        className="animate-marquee whitespace-nowrap font-mono text-4xl font-black uppercase text-[var(--color-ink)]"
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="inline-block px-4">{content}</span>
        <span className="inline-block px-4">{content}</span>
      </div>
    </div>
  );
}

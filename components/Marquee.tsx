"use client";

export function Marquee({ text, speed = 10 }: { text: string; speed?: number }) {
  // Each half must be wider than the viewport for the -50% loop to be seamless.
  const content = Array(4).fill(text).join(" • ");

  return (
    <div
      aria-hidden="true"
      className="relative flex w-full overflow-hidden border-y-[6px] border-[var(--color-ink)] bg-[var(--color-neon-lime)] py-4 mix-blend-multiply"
    >
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

export function SectionHeading({
  num,
  label,
  id,
}: {
  num: string;
  label: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="mb-12 flex w-fit -rotate-1 items-end gap-4 border-[6px] border-[var(--color-ink)] bg-[var(--color-yellow)] px-4 py-3 text-4xl font-black uppercase leading-none shadow-[10px_10px_0_var(--color-accent)] md:text-6xl"
    >
      <span className="section-num border-r-[6px] border-[var(--color-ink)] pr-4 text-xl md:text-2xl">
        {num}
      </span>
      <span>{label}</span>
    </h2>
  );
}

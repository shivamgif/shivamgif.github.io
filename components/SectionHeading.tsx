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
      className="mb-12 flex w-fit max-w-full flex-wrap -rotate-1 items-end gap-2 border-[4px] border-[var(--color-ink)] bg-[var(--color-yellow)] px-3 py-2 text-2xl font-black uppercase leading-none shadow-[6px_6px_0_var(--color-accent)] sm:gap-4 sm:border-[6px] sm:px-4 sm:py-3 sm:text-4xl sm:shadow-[10px_10px_0_var(--color-accent)] md:text-6xl"
    >
      <span className="section-num border-r-[4px] border-[var(--color-ink)] pr-2 text-lg sm:border-r-[6px] sm:pr-4 sm:text-xl md:text-2xl">
        {num}
      </span>
      <span>{label}</span>
    </h2>
  );
}

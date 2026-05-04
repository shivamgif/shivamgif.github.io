import { cv } from "@/content/cv";
import type { Locale } from "@/lib/i18n";

const dateRank = (value: string) => {
  if (value === "now" || value === "ongoing") return 999999;
  const [month, year] = value.split(".").map(Number);
  return year * 12 + month;
};

export function CVTimeline({ locale }: { locale: Locale }) {
  const chronologicalCv = [...cv].sort((a, b) => {
    const endDiff = dateRank(b.to) - dateRank(a.to);
    if (endDiff !== 0) return endDiff;
    return dateRank(b.from) - dateRank(a.from);
  });

  return (
    <ol className="space-y-6 border-l-[10px] border-[var(--color-ink)] pl-7">
      {chronologicalCv.map((e) => (
        <li
          key={e.id}
          className="relative border-[5px] border-[var(--color-ink)] bg-white p-4 shadow-[8px_8px_0_var(--color-blue)] odd:shadow-[8px_8px_0_var(--color-accent)]"
        >
          <span className="absolute -left-[44px] top-4 h-7 w-7 border-[5px] border-[var(--color-ink)] bg-[var(--color-yellow)]" />
          <div className="w-fit border-[3px] border-[var(--color-ink)] bg-[var(--color-ink)] px-2 py-1 font-mono text-xs font-black text-[var(--color-paper)]">
            {e.from} → {e.to}
          </div>
          <h3 className="mt-3 text-xl font-black uppercase leading-tight md:text-2xl">
            {e.title[locale]}
          </h3>
          <div className="mt-1 font-mono text-xs font-black uppercase tracking-wider text-[var(--color-accent)]">
            {e.org}
          </div>
          {e.detail[locale] && (
            <p className="mt-2 border-l-[6px] border-[var(--color-ink)] pl-3 text-sm font-bold">
              {e.detail[locale]}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

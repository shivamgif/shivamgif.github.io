import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";

export function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const base = `/${locale}/`;
  return (
    <header className="sticky top-0 z-30 border-b-[6px] border-[var(--color-ink)] bg-[var(--color-yellow)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <Link
          href={base}
          className="border-[4px] border-[var(--color-ink)] bg-white px-3 py-1 font-mono text-sm font-black shadow-[4px_4px_0_var(--color-ink)]"
        >
          SHIVAM/RAJPUT
        </Link>
        <nav className="hidden gap-2 font-mono text-sm font-black uppercase md:flex">
          <a className="border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] px-3 py-1 hover:bg-[var(--color-accent)] hover:text-white" href={`${base}#work`}>{dict.nav.work}</a>
          <a className="border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] px-3 py-1 hover:bg-[var(--color-accent)] hover:text-white" href={`${base}#cv`}>{dict.nav.cv}</a>
          <a className="border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] px-3 py-1 hover:bg-[var(--color-accent)] hover:text-white" href={`${base}#contact`}>{dict.nav.contact}</a>
        </nav>
        <LangToggle current={locale} />
      </div>
    </header>
  );
}

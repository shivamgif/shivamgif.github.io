import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";

export function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const base = `/${locale}/`;
  return (
    <header className="sticky top-0 z-30 border-b-[6px] border-[var(--color-ink)] bg-[var(--color-yellow)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link
          href={base}
          className="border-[4px] border-[var(--color-ink)] bg-white px-3 py-1 font-mono text-sm font-black shadow-[4px_4px_0_var(--color-ink)]"
        >
          SHIVAM/RAJPUT
        </Link>
        <nav className="order-3 flex w-full justify-center gap-1.5 font-mono text-xs font-black uppercase sm:gap-2 sm:text-sm md:order-none md:w-auto">
          <a className="border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] px-2 py-1 hover:bg-[var(--color-accent)] hover:text-white sm:px-3" href={`${base}#work`}>{dict.nav.work}</a>
          <a className="border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] px-2 py-1 hover:bg-[var(--color-accent)] hover:text-white sm:px-3" href={`${base}#cv`}>{dict.nav.cv}</a>
          <a className="border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)] px-2 py-1 hover:bg-[var(--color-accent)] hover:text-white sm:px-3" href={`${base}#contact`}>{dict.nav.contact}</a>
        </nav>
        <LangToggle current={locale} />
      </div>
    </header>
  );
}

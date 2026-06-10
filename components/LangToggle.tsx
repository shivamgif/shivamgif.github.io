"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export function LangToggle({ current }: { current: Locale }) {
  const pathname = usePathname() ?? "/";

  const hrefFor = (next: Locale) => {
    const re = new RegExp(`^/(${locales.join("|")})(?=/|$)`);
    const stripped = pathname.replace(re, "");
    const suffix = stripped && stripped !== "/" ? stripped : "/";
    return `/${next}${suffix}`;
  };

  return (
    <div className="flex gap-1 font-mono text-xs font-black">
      {locales.map((l) => {
        const active = l === current;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            replace
            aria-current={active ? "page" : undefined}
            className={`border-[3px] border-[var(--color-ink)] px-2 py-1 ${
              active
                ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "bg-white hover:bg-[var(--color-accent)] hover:text-white"
            }`}
          >
            {localeNames[l]}
          </Link>
        );
      })}
    </div>
  );
}

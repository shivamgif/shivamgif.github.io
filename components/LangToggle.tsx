"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export function LangToggle({ current }: { current: Locale }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  const swap = (next: Locale) => {
    const re = new RegExp(`^/(${locales.join("|")})(?=/|$)`);
    const stripped = pathname.replace(re, "");
    const suffix = stripped && stripped !== "/" ? stripped : "/";
    const target = `/${next}${suffix}`;
    router.replace(target);
  };

  return (
    <div className="flex gap-1 font-mono text-xs font-black">
      {locales.map((l) => {
        const active = l === current;
        return (
          <button
            key={l}
            onClick={() => swap(l)}
            aria-current={active ? "true" : undefined}
            className={`border-[3px] border-[var(--color-ink)] px-2 py-1 ${
              active
                ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "bg-white hover:bg-[var(--color-accent)] hover:text-white"
            }`}
          >
            {localeNames[l]}
          </button>
        );
      })}
    </div>
  );
}

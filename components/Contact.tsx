import type { Dict } from "@/lib/i18n";

export function Contact({ dict }: { dict: Dict }) {
  const items = [
    { label: "EMAIL", value: "shivam.rajput@rwth-aachen.de", href: "mailto:shivam.rajput@rwth-aachen.de" },
    { label: "GITHUB", value: "shivamgif", href: "https://github.com/shivamgif" },
    {
      label: "LINKEDIN",
      value: "shivamgif",
      href: "https://www.linkedin.com/in/shivamgif/",
    },
  ];
  return (
    <div className="space-y-6">
      <p className="max-w-2xl border-[6px] border-[var(--color-ink)] bg-[var(--color-blue)] p-5 text-2xl font-black leading-tight shadow-[10px_10px_0_var(--color-ink)]">
        {dict.contact.lead}
      </p>
      <ul className="grid gap-5 md:grid-cols-3">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              target="_blank"
              rel="noreferrer"
              className="brut-border brut-shadow brut-shadow-hover block bg-white p-5"
            >
              <div className="mb-2 w-fit border-[3px] border-[var(--color-ink)] bg-[var(--color-yellow)] px-2 py-1 font-mono text-[10px] font-black uppercase tracking-wider">
                {it.label}
              </div>
              <div className="break-all text-lg font-black">{it.value} ↗</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

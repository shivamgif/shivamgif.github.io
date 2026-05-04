import { notFound } from "next/navigation";
import { hasLocale, locales, getDict } from "@/lib/i18n";
import { Header } from "@/components/Header";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Header dict={dict} locale={locale} />
      <main className="flex-1">{children}</main>
      <footer className="border-t-4 border-[var(--color-ink)] px-6 py-6 mt-24 text-xs font-mono">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-between">
          <span>© {new Date().getFullYear()} Shivam Singh Rajput</span>
          <span className="text-[var(--color-muted)]">{dict.footer.built}</span>
        </div>
      </footer>
    </div>
  );
}

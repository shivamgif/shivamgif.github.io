import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { hasLocale, locales, getDict, type Locale } from "@/lib/i18n";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { FooterYear } from "@/components/FooterYear";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://shivamgif.github.io";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDict(locale);

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}/`])
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/`,
      languages: { ...languages, "x-default": `${SITE_URL}/en/` },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${SITE_URL}/${locale}/`,
      siteName: "Shivam Singh Rajput",
      locale,
      type: "website",
      images: [{ url: `${SITE_URL}/myphoto.webp`, width: 800, height: 1345 }],
    },
    twitter: {
      card: "summary",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${SITE_URL}/myphoto.webp`],
    },
  };
}

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
    <html
      lang={locale}
      className={`${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] relative">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:border-4 focus:border-[var(--color-ink)] focus:bg-[var(--color-yellow)] focus:px-4 focus:py-2 focus:font-mono focus:font-black"
        >
          Skip to content
        </a>
        <CustomCursor />
        <div
          className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.15] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="flex flex-col min-h-screen">
          <Header dict={dict} locale={locale as Locale} />
          <main className="flex-1">{children}</main>
          <footer className="border-t-4 border-[var(--color-ink)] px-6 py-6 mt-24 text-xs font-mono">
            <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-between">
              <span>
                © <FooterYear /> Shivam Singh Rajput
              </span>
              <span className="text-[var(--color-muted)]">
                {dict.footer.built}
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

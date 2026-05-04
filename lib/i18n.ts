export const locales = ["en", "de", "hi", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  hi: "HI",
  it: "IT",
};

export const hasLocale = (l: string): l is Locale =>
  (locales as readonly string[]).includes(l);

const dictionaries = {
  en: () => import("@/content/i18n/en.json").then((m) => m.default),
  de: () => import("@/content/i18n/de.json").then((m) => m.default),
  hi: () => import("@/content/i18n/hi.json").then((m) => m.default),
  it: () => import("@/content/i18n/it.json").then((m) => m.default),
};

export type Dict = Awaited<ReturnType<typeof dictionaries.en>>;

export const getDict = async (locale: Locale): Promise<Dict> =>
  dictionaries[locale]();

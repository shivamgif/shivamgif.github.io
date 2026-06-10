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

export type Dict = typeof import("@/content/i18n/en.json");

// `satisfies Dict` makes a missing key in any translation a build error
// instead of a silent `undefined` in production.
const dictionaries: Record<Locale, () => Promise<Dict>> = {
  en: () => import("@/content/i18n/en.json").then((m) => m.default satisfies Dict),
  de: () => import("@/content/i18n/de.json").then((m) => m.default satisfies Dict),
  hi: () => import("@/content/i18n/hi.json").then((m) => m.default satisfies Dict),
  it: () => import("@/content/i18n/it.json").then((m) => m.default satisfies Dict),
};

export const getDict = async (locale: Locale): Promise<Dict> =>
  dictionaries[locale]();

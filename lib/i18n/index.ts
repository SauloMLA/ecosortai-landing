import { en } from "./en";
import { es } from "./es";

export type Locale = "en" | "es";

const dictionaries = { en, es } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}

export { en, es };
export type { Translations } from "./en";

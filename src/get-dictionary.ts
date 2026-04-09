import 'server-only';
import type { Locale } from './i18n-config';

import en from './dictionaries/en.json';

const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    no: () => import('./dictionaries/no.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en();
type Price =
  | string
  | {
      base: string;
      cfo: string;
      total: string;
      note?: string;
    }
  | {
      USD: string | { base: string; cfo: string; total: string; note?: string };
      EUR: string | { base: string; cfo: string; total: string; note?: string };
      GBP: string | { base: string; cfo: string; total: string; note?: string };
    };

export type Dictionary = {
  about: unknown;
  pricing: {
    header: {
      title: string;
      subtitle: string;
      description: string;
    };
    currency: unknown;
    plans: {
      id: string;
      label?: string;
      name: string;
      tagline: string;
      price: Price;
      type: string;
      billingNote: string;
      features: string[];
      meta?: unknown;
      cta: string;
      highlight?: boolean;
      category?: string;
      note?: unknown;
    }[];
    footer: {
      note: string;
      cta: string;
    };
  };

  [key: string]: unknown;
};

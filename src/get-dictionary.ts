import 'server-only';
import type { Locale } from './i18n-config';

import en from './dictionaries/en.json';

const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    no: () => import('./dictionaries/no.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en();
export type Dictionary = typeof en;

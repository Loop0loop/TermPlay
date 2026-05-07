import { useState, useEffect } from 'react';
import ko from '../locales/ko.json';
import en from '../locales/en.json';
import ja from '../locales/ja.json';

export const locales = { ko, en, ja };
export type Locale = keyof typeof locales;

export const defaultLocale: Locale = "ko";

let currentLocale: Locale = defaultLocale;
const listeners = new Set<() => void>();

export function setLocale(locale: Locale) {
  currentLocale = locale;
  listeners.forEach(l => l());
}

export type GameCopyKey = keyof typeof locales["ko"]["games"];

export function useI18n() {
  const [locale, setLocalLocale] = useState<Locale>(currentLocale);
  
  useEffect(() => {
    const handler = () => setLocalLocale(currentLocale);
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  const t = locales[locale];
  
  return Object.assign({}, t, {
    _switchLanguage: (newLocale: Locale) => setLocale(newLocale),
    _currentLocale: locale
  });
}

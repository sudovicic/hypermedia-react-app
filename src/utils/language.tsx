export interface Language {
  nativeName: string;
  shortName: string;
}

export const availableLanguages: Record<string, Language> = {
  en: {
    nativeName: 'English',
    shortName: 'EN',
  },
  de: {
    nativeName: 'Deutsch',
    shortName: 'DE',
  },
};

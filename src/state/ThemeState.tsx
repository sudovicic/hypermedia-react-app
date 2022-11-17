import type { AtomEffect } from 'recoil';
import { atom } from 'recoil';
import { localStorageEffect } from './utils';

export type ThemeMode = 'light' | 'dark';
export const LS_KEY_THEME = 'theme';

const validateThemeMode = (item: ThemeMode | null) => (item ? ['light', 'dark'].includes(item) : false);

const applyThemeEffect =
  (): AtomEffect<ThemeMode> =>
  ({ onSet }) => {
    onSet((value) => document.documentElement.setAttribute('data-theme', value));
  };

export const themeState = atom<ThemeMode>({
  key: 'appThemeMode',
  // hack to get the theme to be set correctly on initial page load
  default: (() => {
    const storedValue = localStorage.getItem(LS_KEY_THEME);
    const value = storedValue ? (JSON.parse(storedValue) as ThemeMode) : 'light';
    document.documentElement.setAttribute('data-theme', value);
    return value;
  })(),
  effects: [localStorageEffect<ThemeMode>(LS_KEY_THEME, validateThemeMode), applyThemeEffect()],
});

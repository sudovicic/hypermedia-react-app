import type { AtomEffect } from 'recoil';
import { atom } from 'recoil';

export type ThemeMode = 'light' | 'dark';
export const LS_KEY_THEME = 'theme';

/**
 * This is our Atom Effect which will behave similarly to React.useEffect with
 * the atom in the dependencies array
 *
 * @param key the value used to store and retrieve data from local storage
 * @see https://dev.to/skinnypetethegiraffe/lightdark-mode-toggle-using-mui-and-recoil-ts-3bj0
 */
const localStorageEffect =
  (key: string): AtomEffect<ThemeMode> =>
  ({ setSelf, onSet }) => {
    const stored = localStorage.getItem(key);

    if (stored && ['light', 'dark'].includes(stored)) {
      // If the value is valid, the call the provided function setSelf which initializes the atom value
      setSelf(stored as ThemeMode);
    }

    // Creates the callback triggered when the atom is changed
    onSet((value, _, isReset) => {
      if (isReset) {
        // If atom has been reset then remove it from local storage
        localStorage.removeItem(key);
      } else {
        // If value has changed then store the value in local storage
        localStorage.setItem(key, value);
      }
    });
  };

const applyThemeEffect =
  (): AtomEffect<ThemeMode> =>
  ({ onSet }) => {
    onSet((value) => document.documentElement.setAttribute('data-theme', value));
  };

export const appThemeMode = atom<ThemeMode>({
  key: 'appThemeMode',
  // hack to get the theme to be set correctly on initial page load
  default: (() => {
    const value = localStorage.getItem(LS_KEY_THEME) as ThemeMode;
    document.documentElement.setAttribute('data-theme', value);
    return value;
  })(),
  effects: [localStorageEffect(LS_KEY_THEME), applyThemeEffect()],
});

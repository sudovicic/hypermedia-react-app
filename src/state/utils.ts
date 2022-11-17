import type { AtomEffect } from 'recoil';

/**
 * This is our Atom Effect which will behave similarly to React.useEffect with
 * the atom in the dependencies array
 *
 * @param key the value used to store and retrieve data from local storage
 * @param validationFn validation function to check whether the content is valid
 * @see https://dev.to/skinnypetethegiraffe/lightdark-mode-toggle-using-mui-and-recoil-ts-3bj0
 * @see https://usehooks-ts.com/react-hook/use-local-storage
 */
export const localStorageEffect =
  <T>(key: string, validationFn: (item: T | null) => boolean): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue) {
        const parsedValue = JSON.parse(storedValue) as T;

        if (validationFn(parsedValue)) {
          setSelf(parsedValue);
        }
      }
    } catch (e) {
      console.warn(`Error reading localStorage key “${key}”:`, e);
    }

    // Creates the callback triggered when the atom is changed
    onSet((value, _, isReset) => {
      if (isReset) {
        // If atom has been reset then remove it from local storage
        try {
          localStorage.removeItem(key);
        } catch (e) {
          console.warn(`Error removing localStorage key “${key}”:`, e);
        }
      } else {
        // If value has changed then store the value in local storage
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
          console.warn(`Error writing to localStorage for key “${key}”:`, e);
        }
      }
    });
  };

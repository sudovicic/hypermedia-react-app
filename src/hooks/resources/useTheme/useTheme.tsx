import { useRecoilState } from 'recoil';
import { themeState } from '../../../state/ThemeState';

export default function useTheme() {
  const [themeMode, setThemeMode] = useRecoilState(themeState);

  return {
    currentTheme: themeMode,
    toggleTheme: () => setThemeMode(themeMode === 'dark' ? 'light' : 'dark'),
  };
}

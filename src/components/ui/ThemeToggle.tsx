import React from 'react';
import useTheme from '../../hooks/resources/useTheme/useTheme';
import Moon from '../icons/Moon';
import Sun from '../icons/Sun';

export default function ThemeToggle() {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <div className="px-4">
      <label className="swap swap-rotate">
        <input type="checkbox" checked={currentTheme === 'light'} onChange={toggleTheme} />
        <Moon className="swap-on fill-current w-6 h-6" />
        <Sun className="swap-off fill-current w-6 h-6" />
      </label>
    </div>
  );
}

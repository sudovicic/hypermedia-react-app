import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar';
import ThemeToggle from '../ThemeToggle';
import LanguageDropdown from '../LanguageDropdown';
import NavBarBurgerMenu from './NavBarBurgerMenu';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="navbar">
      <div className="flex-none">
        <NavBarBurgerMenu />
      </div>
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost normal-case text-xl">
          {t('app_name')}
        </Link>
      </div>
      {location.pathname === '/home' && <SearchBar />}
      <ThemeToggle />
      <div className="flex-none">
        <LanguageDropdown />
      </div>
    </div>
  );
}

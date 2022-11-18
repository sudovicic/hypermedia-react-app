import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MenuIcon from '../../icons/Menu';

export default function NavBarBurgerMenu() {
  const { t } = useTranslation();

  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn btn-square btn-ghost">
        <MenuIcon className="fill-current w-5 h-5" />
      </label>
      <ul tabIndex={0} className="dropdown-content menu menu-compact rounded-box p-2 shadow bg-base-100 w-52">
        <li>
          <Link to="/list" className="btn btn-ghost">
            {t('list')}
          </Link>
          <Link to="/shelf" className="btn btn-ghost">
            {t('shelf')}
          </Link>
        </li>
      </ul>
    </div>
  );
}

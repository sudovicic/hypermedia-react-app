import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { availableLanguages } from '../utils/language';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const selected = useCallback((l: string) => i18n.resolvedLanguage === l, [i18n]);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
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
      </div>
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost normal-case text-xl">
          shelvr
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end dropdown-hover">
          <label tabIndex={1} className="btn btn-ghost rounded-btn">
            <span className="flex pr-2">{i18n.resolvedLanguage.toUpperCase()}</span>
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </label>
          <ul tabIndex={1} className="dropdown-content menu menu-compact p-2 rounded-box shadow bg-base-100 w-52">
            {Object.keys(availableLanguages).map((l) => (
              <li key={l}>
                <button
                  type="submit"
                  key={l}
                  className={classNames('btn btn-ghost', { 'btn-disabled': selected(l) })}
                  onClick={() => void i18n.changeLanguage(l)}
                  disabled={selected(l)}
                >
                  {availableLanguages[l].nativeName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

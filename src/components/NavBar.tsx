import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { availableLanguages } from '../utils/language';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import SearchBar from './SearchBar';

export default function NavBar() {
  const { i18n } = useTranslation();
  const selected = useCallback((l: string) => i18n.resolvedLanguage === l, [i18n]);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost normal-case text-xl">
          shelvr
        </Link>
      </div>
      <SearchBar />
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          <li tabIndex={0}>
            <a>
              {i18n.resolvedLanguage.toUpperCase()}
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="bg-base-100">
              {Object.keys(availableLanguages).map((l) => (
                <li key={l}>
                  <button
                    type="submit"
                    key={l}
                    className={classNames('btn', { 'btn-disabled': selected(l) })}
                    onClick={() => void i18n.changeLanguage(l)}
                    disabled={selected(l)}
                  >
                    {availableLanguages[l].nativeName}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

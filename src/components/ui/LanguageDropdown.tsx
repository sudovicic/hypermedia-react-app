import React, { useCallback } from 'react';
import { availableLanguages } from '../../utils/language';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ChevronDown from '../icons/ChevronDown';

export default function LanguageDropdown() {
  const { i18n } = useTranslation();
  const selected = useCallback((l: string) => i18n.resolvedLanguage === l, [i18n]);

  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <label tabIndex={1} className="btn btn-ghost rounded-btn">
        <span className="flex pr-2 min-w-[2rem] justify-center">{i18n.resolvedLanguage.toUpperCase()}</span>
        <ChevronDown className="fill-current w-5 h-5" />
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
  );
}

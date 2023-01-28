import classNames from 'classnames/bind';
import { IconEnglish, IconVietNam } from 'components/Icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitch.module.scss';

const cx = classNames.bind(styles);

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [languageChanged, setLanguageChanged] = useState<string>();

  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
      setLanguageChanged(lng);
    },
    [setLanguageChanged, i18n]
  );

  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng') || 'en';
    setLanguageChanged(lang);
  }, []);

  return (
    <div className={cx('languageSwitch-icon')}>
      {languageChanged === 'en' ? (
        <IconEnglish width={35} height={35} onClick={() => changeLanguage('vi')} />
      ) : (
        <IconVietNam width={35} height={35} onClick={() => changeLanguage('en')} />
      )}
    </div>
  );
};

export default LanguageSwitch;

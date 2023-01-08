import classNames from 'classnames/bind';
import { IconClose, IconMenu, IconSearch } from 'components/Icons';
import { SearchBox } from 'components/SearchBox';
import { WrapperLink } from 'components/WrapperLink';
import { defaultAvatar } from 'constants/global';
import { PATH } from 'constants/path';
import { useCallback, useMemo, useRef } from 'react';
import { RootState, useAppSelector } from 'stores';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
  const menuLinks = useMemo(
    () => [
      {
        path: PATH.news,
        display: 'News'
      },
      {
        path: PATH.history,
        display: 'History'
      },
      {
        path: PATH.discovery,
        display: 'Discovery'
      },
      {
        path: PATH.explore,
        display: 'Explore'
      }
    ],
    []
  );

  const { currentUser } = useAppSelector((state: RootState) => state.auth);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = useCallback(() => {
    if (menuRef.current) menuRef.current.classList.toggle('menu-hidden');
  }, [menuRef]);

  return (
    <header className={cx('header')}>
      <div className="container">
        <nav className={cx('navbar')}>
          <div className={cx('navbar-leftSide')}>
            <WrapperLink className={cx('navbar-logo')}>TCinema</WrapperLink>
            <ul className={cx('menu')} ref={menuRef}>
              {menuLinks.map((link) => (
                <li key={link.path}>
                  <WrapperLink className={cx('menu-link')} href={link.path}>
                    {link.display}
                  </WrapperLink>
                </li>
              ))}
              <button className={cx('mobile-buttonClose')} onClick={toggleMenu}>
                <IconClose />
              </button>
            </ul>
          </div>
          <div className={cx('navbar-rightSide')}>
            <SearchBox className={cx('searchBox')} />
            <div className={cx('mobile-actions')}>
              <WrapperLink href={PATH.search}>
                <IconSearch fill="#fff" />
              </WrapperLink>
              <button className={cx('mobile-buttonOpen')} onClick={toggleMenu}>
                <IconMenu fill="#fff" />
              </button>
            </div>
            {currentUser ? (
              <WrapperLink href={PATH.profile} className={cx('avatar')}>
                <picture>
                  <img
                    src={currentUser?.photoURL || defaultAvatar}
                    alt={currentUser?.displayName}
                  />
                </picture>
              </WrapperLink>
            ) : (
              <WrapperLink href={PATH.signIn} className={cx('menu-login')}>
                Sign In
              </WrapperLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

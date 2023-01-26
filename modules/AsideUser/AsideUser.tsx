import classNames from 'classnames/bind';
import { Button } from 'components/ButtonCustomize';
import { IconFollow, IconKeyPassword, IconLogout, IconUser } from 'components/Icons';
import { Image } from 'components/Image';
import { WrapperLink } from 'components/WrapperLink';
import { defaultAvatar } from 'constants/global';
import { PATH } from 'constants/path';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'stores';
import { logout } from 'stores/slices/auth';
import styles from './AsideUser.module.scss';

const cx = classNames.bind(styles);

const LINKS = [
  {
    path: PATH.profile,
    icon: <IconUser />,
    display: 'Profile'
  },
  {
    path: PATH.changePassword,
    icon: <IconKeyPassword />,
    display: 'Password'
  },
  {
    path: PATH.follow,
    icon: <IconFollow />,
    display: 'Follow'
  }
];

const AsideUser = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className={cx('aside-container')}>
      <div className={cx('aside-info')}>
        <div className={cx('aside-avatar')}>
          <Image src={currentUser?.photoURL || defaultAvatar} alt="avatar" />
        </div>
        <div className={cx('aside-desc')}>
          <h3 className={cx('aside-displayName')}>{currentUser?.displayName}</h3>
          <h3 className={cx('aside-email')}>User</h3>
        </div>
      </div>
      <div className={cx('aside-links')}>
        {LINKS.map((link, index) => (
          <WrapperLink key={index} href={link.path} className={cx('aside-item')}>
            {link.icon}
            <span className={cx('aside-more')}>{link.display}</span>
          </WrapperLink>
        ))}

        <Button className={cx('aside-btn')} leftIcon={<IconLogout />} onClick={handleLogout}>
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AsideUser;

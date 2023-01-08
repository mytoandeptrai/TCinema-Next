import classNames from 'classnames/bind';
import { Meta } from 'components/Meta';
import { WrapperLink } from 'components/WrapperLink';
import { PATH } from 'constants/path';
import React from 'react';
import styles from 'styles/page404.module.scss';

const cx = classNames.bind(styles);

const PageNotFound = () => {
  return (
    <div className={cx('page404-container')}>
      <Meta title="Page Not Found - TCinema" />
      <h1 className={cx('text-gradient', 'page404-heading')}>404</h1>
      <h2 className={cx('page404-title')}>Something is not right !</h2>
      <p className={cx('page404-description')}>We can not find the page you are looking for.</p>
      <WrapperLink href={PATH.home} className={cx('page404-link', 'button-gradient-purple')}>
        Return Home
      </WrapperLink>
    </div>
  );
};

export default PageNotFound;

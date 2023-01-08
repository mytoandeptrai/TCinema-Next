import classNames from 'classnames/bind';
import Footer from 'layouts/Footer/Footer';
import Header from 'layouts/Header/Header';
import React from 'react';

import styles from './LayoutPrimary.module.scss';

const cx = classNames.bind(styles);

interface LayoutPrimaryProps {
  children: React.ReactNode;
}

const LayoutPrimary = ({ children }: LayoutPrimaryProps) => {
  return (
    <div className={cx('layoutPrimary-wrapper')}>
      <Header />
      <main className={cx('layoutPrimary-main')}>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutPrimary;

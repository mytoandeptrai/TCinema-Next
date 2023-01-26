import classNames from 'classnames/bind';
import React, { ReactNode } from 'react';
import styles from './NewsList.module.scss';

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
  heading?: string;
};

const NewsList = ({ children, heading }: Props) => {
  return (
    <div className={cx('newsList-wrapper')}>
      {heading ? <h3 className={cx('newsList-heading')}>{heading}</h3> : null}
      <div className={cx('newsList-content')}>{children}</div>
    </div>
  );
};

export default NewsList;

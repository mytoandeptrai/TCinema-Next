import classNames from 'classnames/bind';
import React from 'react';
import styles from '../NewSkeleton.module.scss';

const cx = classNames.bind(styles);

const NewCardSkeleton = () => {
  return (
    <div>
      <div className={cx('newsList-skeletonThumbnail')} />
      <div className={cx('newsList-skeletonTitle')} />
      <div className={cx('newsList-skeletonDescription')} />
    </div>
  );
};

export default NewCardSkeleton;

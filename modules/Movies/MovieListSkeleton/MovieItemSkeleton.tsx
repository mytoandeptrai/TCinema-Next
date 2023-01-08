import classNames from 'classnames/bind';
import React from 'react';
import styles from './MovieListSkeleton.module.scss';

const cx = classNames.bind(styles);

const MovieItemSkeleton = () => {
  return (
    <div>
      <div className={cx('movieListSkeleton-poster', 'skeleton')}></div>
      <div className={cx('movieListSkeleton-title', 'skeleton')}></div>
    </div>
  );
};

export default MovieItemSkeleton;

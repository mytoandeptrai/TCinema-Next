import classNames from 'classnames/bind';
import React from 'react';
import styles from './MovieList.module.scss';

const cx = classNames.bind(styles);

type Props = {
  heading?: string;
  children: React.ReactNode;
};

const MovieList = ({ heading, children }: Props) => {
  return (
    <div className={cx('movieList-container', 'section')}>
      {heading ? <h3 className={cx('movieList-heading', 'heading')}>{heading}</h3> : null}
      <div className={cx('movieList-lists', 'list')}>{children}</div>
    </div>
  );
};

export default MovieList;

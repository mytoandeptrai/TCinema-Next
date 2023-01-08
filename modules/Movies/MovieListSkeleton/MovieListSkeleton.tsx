import { MOVIES_CONSTANTS } from 'constants/global';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './MovieListSkeleton.module.scss';
import MovieList from '../MovieList/MovieList';
import MovieItemSkeleton from './MovieItemSkeleton';

const cx = classNames.bind(styles);
type Props = {
  hasHeading?: boolean;
  count?: number;
};

const MovieListSkeleton = ({
  hasHeading = false,
  count = MOVIES_CONSTANTS.NUMBER_OF_MOVIES_LIST
}: Props) => {
  return (
    <div className={cx('movieListSkeleton-container', 'skeleton')}>
      {hasHeading ? <div className={cx('movieListSkeleton-heading', 'skeleton')}></div> : null}
      <MovieList>
        {Array(count)
          .fill(0)
          .map((item, index) => (
            <MovieItemSkeleton key={index} />
          ))}
      </MovieList>
    </div>
  );
};

export default MovieListSkeleton;

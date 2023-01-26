import classNames from 'classnames/bind';
import React from 'react';
import { IStar } from 'types';
import { WatchStarsItem } from '../WatchStarsItem';
import styles from './WatchStars.module.scss';

const cx = classNames.bind(styles);

type Props = {
  starsList: IStar[];
};

const WatchStars = ({ starsList }: Props) => {
  if (starsList.length === 0) return null;

  return (
    <div className={cx('watchStars-list')}>
      {starsList.map((star) => (
        <WatchStarsItem
          key={star.starId}
          image={star.image}
          name={star.localName}
          starId={star.starId}
        />
      ))}
    </div>
  );
};

export default WatchStars;

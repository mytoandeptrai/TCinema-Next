import classNames from 'classnames/bind';
import { Image } from 'components/Image';
import { WrapperLink } from 'components/WrapperLink';
import { PATH } from 'constants/path';
import React from 'react';
import { IRefItem } from 'types';
import styles from './WatchRelatedSeries.module.scss';

const cx = classNames.bind(styles);

type Props = {
  refList: IRefItem[];
};

const WatchRelatedSeries = ({ refList }: Props) => {
  if (refList.length === 0) return null;
  return (
    <div className={cx('watchRelatedSeries-list')}>
      <span className={cx('watchRelatedSeries-heading')}>Related series</span>
      {refList?.map((movie: IRefItem) => {
        return (
          <div key={movie.id} className={cx('watchRelatedSeries-movie')}>
            <WrapperLink
              href={`${PATH.watch}/${movie.category}/${movie.id}`}
              className={cx('watchRelatedSeries-thumb')}
            >
              <Image src={movie.coverHorizontalUrl} width={130} height={70} alt={movie.name} />
            </WrapperLink>
            <div className={cx('watchRelatedSeries-movieInfo')}>
              <WrapperLink href={`${PATH.watch}/${movie.category}/${movie.id}`}>
                {movie.name}
              </WrapperLink>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WatchRelatedSeries;

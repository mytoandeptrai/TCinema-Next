import classNames from 'classnames/bind';
import { Image } from 'components/Image';
import { WrapperLink } from 'components/WrapperLink';
import { PATH } from 'constants/path';
import React from 'react';
import styles from './WatchStarsItem.module.scss';

const cx = classNames.bind(styles);

type Props = {
  starId: number;
  image: string;
  name: string;
};

const WatchStarsItem = ({ image, name, starId }: Props) => {
  return (
    <div className={cx('watchStarsItem-container')}>
      <div className={cx('watchStarsItem-avatar')}>
        <WrapperLink href={`${PATH.star}/${starId}`}>
          <Image src={image} width={100} height={100} alt={name} />
        </WrapperLink>
      </div>
      <WrapperLink href={`${PATH.star}/${starId}`} className={cx('watchStarsItem-name')}>
        {name}
      </WrapperLink>
    </div>
  );
};

export default WatchStarsItem;

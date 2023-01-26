import classNames from 'classnames/bind';
import { WrapperLink } from 'components/WrapperLink';
import { PATH } from 'constants/path';
import React from 'react';
import { IObjIdName } from 'types';
import styles from './WatchCategory.module.scss';

const cx = classNames.bind(styles);

type Props = {
  categories: IObjIdName[];
};

const WatchCategory = ({ categories }: Props) => {
  return (
    <div className={cx('watchCategory-wrapper')}>
      {categories.map((category) => (
        <WrapperLink
          key={category.id}
          href={`${PATH.category}?category=${category.id}`}
          className={cx('watchCategory-item')}
        >
          {category.name}
        </WrapperLink>
      ))}
    </div>
  );
};

export default WatchCategory;

import classNames from 'classnames/bind';
import { TextToggleMore } from 'components/TextCustomize';
import React from 'react';
import styles from './WatchSummary.module.scss';

const cx = classNames.bind(styles);

type Props = {
  introduction: string;
};

const WatchSummary = ({ introduction }: Props) => {
  return (
    <div className={cx('watchSummary-wrapper')}>
      <h4 className={cx('watchSummary-label')}>Summary: </h4>
      <TextToggleMore countLetter={180}>{introduction}</TextToggleMore>
    </div>
  );
};

export default WatchSummary;

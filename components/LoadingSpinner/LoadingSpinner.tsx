import classNames from 'classnames/bind';
import React from 'react';
import styles from './LoadingSpinner.module.scss';

const cx = classNames.bind(styles);

const LoadingSpinner = () => {
  return <div className={cx('loading-container')}></div>;
};

export default LoadingSpinner;

import classNames from 'classnames/bind';
import React from 'react';

import { IconLoading } from 'components/Icons';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type Props = {
  children?: string | React.ReactNode;
  onClick?: () => void;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  primary?: boolean;
  outline?: boolean;
  small?: boolean;
  large?: boolean;
  text?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  box?: boolean;
  type?: any;
  loading?: boolean;
};

const Button = ({
  children,
  onClick = () => {},
  className = '',
  leftIcon,
  rightIcon,
  primary = false,
  outline = false,
  small = false,
  large = false,
  text = false,
  disabled = false,
  rounded = false,
  box = false,
  type = 'text',
  loading = false
}: Props) => {
  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    box,
    [className]: className
  });

  const _props: any = {
    onClick
  };

  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(_props).forEach((key) => {
      if (key.startsWith('on') && typeof _props[key] === 'function') {
        delete _props[key];
      }
    });
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>
        {loading ? <IconLoading className={cx('loading', 'size')} /> : children}
      </span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </button>
  );
};

export default Button;

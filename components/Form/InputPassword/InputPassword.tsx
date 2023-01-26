import classNames from 'classnames/bind';
import { IconHiddenPassword, IconShowPassword } from 'components/Icons';
import React, { InputHTMLAttributes, useState } from 'react';
import styles from './InputPassword.module.scss';

const cx = classNames.bind(styles);

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = ({ name, className = '', ...props }: InputPasswordProps) => {
  const [focus, setFocus] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const toggleVisiblePassword = () => {
    setVisiblePassword((prevState) => !prevState);
  };

  const classes = cx('inputPassword-wrapper', {
    'inputPassword-focused': focus,
    [className]: className
  });

  return (
    <div className={classes}>
      <input
        id={name}
        name={name}
        type={visiblePassword ? 'text' : 'password'}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={cx('inputPassword-input')}
        {...props}
      />
      <button
        type="button"
        onClick={toggleVisiblePassword}
        className={cx('inputPassword-showIcon')}
      >
        {visiblePassword ? <IconShowPassword /> : <IconHiddenPassword />}
      </button>
    </div>
  );
};

export default InputPassword;

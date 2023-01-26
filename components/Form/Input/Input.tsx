import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ name, className = '', ...props }: InputProps) => {
  const classes = cx('inputWrapper', {
    [className]: className
  });

  return <input id={name} name={name} className={classes} {...props} />;
};

export default Input;

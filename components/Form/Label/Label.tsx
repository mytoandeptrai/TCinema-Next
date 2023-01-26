import classNames from 'classnames/bind';
import { LabelHTMLAttributes } from 'react';
import styles from './Label.module.scss';

const cx = classNames.bind(styles);

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ htmlFor, children, className = '', ...props }: LabelProps) => {
  const classes = cx('labelWrapper', {
    [className]: className
  });

  return (
    <label className={classes} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
};

export default Label;

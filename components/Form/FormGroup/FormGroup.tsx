import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import styles from './FormGroup.module.scss';

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
};

const FormGroup = ({ children }: Props) => {
  return <div className={cx('formGroup')}>{children}</div>;
};

export default FormGroup;

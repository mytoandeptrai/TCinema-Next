import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { useDropdown } from '../DropdownContext/DropdownContext';
import styles from '../Dropdown.module.scss';

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
};

const List = ({ children }: Props) => {
  const { show } = useDropdown();
  if (!show) return null;

  return <div className={cx('dropdown-list', 'scrollbar')}>{children}</div>;
};

export default List;

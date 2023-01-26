import classNames from 'classnames/bind';
import React from 'react';
import { DropdownProvider } from '../DropdownContext/DropdownContext';
import List from '../DropdownItems/List';
import Option from '../DropdownItems/Option';
import Select from '../DropdownItems/Select';
import styles from '../Dropdown.module.scss';

const cx = classNames.bind(styles);

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  placeholder?: string;
}

const DropDownContainer = ({ children, placeholder, ...props }: DropdownProps) => {
  return (
    <DropdownProvider placeholder={placeholder} {...props}>
      <div className={cx('dropdown-container')}>{children}</div>
    </DropdownProvider>
  );
};

DropDownContainer.Option = Option;
DropDownContainer.Select = Select;
DropDownContainer.List = List;

export default DropDownContainer;

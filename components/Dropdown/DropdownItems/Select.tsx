import classNames from 'classnames/bind';
import { useDropdown } from '../DropdownContext/DropdownContext';
import styles from '../Dropdown.module.scss';
import React from 'react';

const cx = classNames.bind(styles);

const Select = () => {
  const { toggleHandler, show, title } = useDropdown();
  return (
    <div aria-hidden className={cx('dropdown-select')} onClick={toggleHandler}>
      <span className={cx('dropdown-select__title')}>{title}</span>
      {show ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </div>
  );
};

export default Select;

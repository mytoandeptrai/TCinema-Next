/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';
import { Dispatch, SetStateAction } from 'react';
import { useDropdown } from '../DropdownContext/DropdownContext';
import styles from '../Dropdown.module.scss';
const cx = classNames.bind(styles);

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  handleClickOption?: (
    e: React.MouseEvent<HTMLOptionElement>,
    setTitle: Dispatch<SetStateAction<string>>
  ) => void;
}

const Option = ({ handleClickOption, children }: OptionProps) => {
  const { setShow, setTitle } = useDropdown();
  const handleClick = (e: React.MouseEvent<HTMLOptionElement>) => {
    if (handleClickOption) handleClickOption(e, setTitle);
    setShow(false);
  };
  return (
    <option onClick={handleClick} className={cx('dropdown-option')}>
      {children}
    </option>
  );
};

export default Option;

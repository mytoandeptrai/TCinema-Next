import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './TextToggleMore.module.scss';

const cx = classNames.bind(styles);

type Props = {
  countLetter?: number;
  children: string;
};

const TextToggleMore = ({ children, countLetter = 150 }: Props) => {
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <>
      <span className={cx('textToggleMore-desc')}>
        {isShowMore ? children : `${children.substring(0, countLetter)}... `}
      </span>
      {children.length > countLetter ? (
        <button className={cx('textToggleMore-toggle')} onClick={() => setIsShowMore(!isShowMore)}>
          {isShowMore ? 'Show Less' : 'Show More'}
        </button>
      ) : null}
    </>
  );
};

export default TextToggleMore;

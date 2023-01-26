import classNames from 'classnames/bind';
import React from 'react';
import styles from './EmojisReactions.module.scss';

const cx = classNames.bind(styles);

type Props = {
  emojis: string;
  // eslint-disable-next-line no-unused-vars
  handleChangeEmojis: (emojis: string) => void;
};

const EMOJIS_ARRAY = ['Like', 'Love', 'Haha', 'Wow', 'Sad', 'Angry'];

const EmojisReactions = ({ emojis, handleChangeEmojis }: Props) => {
  return (
    <div className={cx('reactions-container')}>
      <span className={cx(`reactions-${emojis}`)}>{emojis}</span>
      <div className={cx('reactions-list')}>
        {EMOJIS_ARRAY.map((e, i) => (
          <div
            key={i}
            onClick={() => handleChangeEmojis(e)}
            className={cx('emoji', `reactions-${e}`)}
          >
            <div className={cx('icon')} data-title={String(e)}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojisReactions;

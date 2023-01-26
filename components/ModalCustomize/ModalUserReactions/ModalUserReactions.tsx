import React from 'react';
import { ICommentReaction } from 'types';
import Modal from 'react-modal';
import styles from './ModalUserReactions.module.scss';
import classNames from 'classnames/bind';
import { IconClose } from 'components/Icons';
import { Image } from 'components/Image';

const cx = classNames.bind(styles);

type Props = {
  isShowModal: boolean;
  toggleModal: () => void;
  reactions: ICommentReaction[];
};

const ModalUserReactions = ({ isShowModal, reactions, toggleModal }: Props) => {
  return (
    <Modal
      isOpen={isShowModal}
      onRequestClose={toggleModal}
      contentLabel="Bảng cấp độ"
      className={cx('modalUser-container')}
      overlayClassName={cx('modalUser-overlay')}
    >
      <div className={cx('modalUser-content')}>
        <div className={cx('modalUser-header')}>
          <h4>People is reaction to this info</h4>
          <button className={cx('modalUser-closeBtn')} onClick={toggleModal}>
            <IconClose className="!w-5 !h-5" />
          </button>
        </div>

        <div className={cx('modalUser-list')}>
          {reactions?.map((reaction) => (
            <div className={cx('modalUser-item')} key={reaction.id}>
              <Image
                width={44}
                height={44}
                alt={reaction.fullname}
                className={cx('modalUser-image')}
                src={reaction.avatar}
              />
              <span className={cx('modalUser-username')}>{reaction.fullname}</span>
              <Image
                width={24}
                height={24}
                alt={reaction.reaction}
                className={cx('modalUser-emoji')}
                src={`/icon-${reaction.reaction}.png`}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalUserReactions;

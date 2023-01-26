import classNames from 'classnames/bind';
import { EmojisReactions } from 'components/EmojisReactions';
import { Image } from 'components/Image';
import useModal from 'hooks/useModal';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from 'stores';
import { IComment } from 'types';
import { checkTimeAgo } from 'utils/timeFormat';
import { CommentAddEdit } from '../CommentAddEdit';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

type Props = {
  comment: IComment;
};

const CommentItem = ({ comment }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { isShow, toggleModal } = useModal();
  const { currentUser } = useAppSelector((state) => state.auth);

  const foundMyReactionIndex = useMemo(() => {
    return comment.reactions.findIndex((el) => el.userId === currentUser?.uid);
  }, [comment, currentUser]);
  const myReaction = comment.reactions[foundMyReactionIndex];

  const reactionTypes: string[] = [];
  const [emojis, setEmojis] = useState(myReaction?.reaction || 'Like');

  const toggleOpenEditTextAreaHandler = useCallback(() => {
    if (!currentUser || currentUser?.uid !== comment?.userId) return;
    setIsEditing(!isEditing);
  }, [isEditing, setIsEditing, comment, currentUser]);

  const handleChangeEmojis = useCallback((value: string) => {
    console.log('🚀 ~ file: CommentItem.tsx:33 ~ handleChangeEmojis ~ value', value);
  }, []);

  const handleDeleteComment = useCallback(() => {}, []);

  const renderCommentReactions = () => {
    if (comment.reactions.length === 0) return null;

    return (
      <div className={cx('commentItem-reactions')} onClick={toggleModal}>
        {comment?.reactions?.slice(0, 3)?.map((item) => {
          const foundTypeIndex = reactionTypes.findIndex((r) => r === item.reaction);
          if (foundTypeIndex !== -1) return null;
          reactionTypes.push(item.reaction);
          return (
            <Image
              key={item.id}
              src={`/icon-${item.reaction}.png`}
              alt={item.fullname}
              className={cx('commentItem-image')}
            />
          );
        })}

        <span className={cx('commentItem-reactionsCount')}>{comment.reactions.length}</span>
      </div>
    );
  };

  return (
    <div className={cx('commentItem-container')}>
      <div className={cx('commentItem-avatar')}>
        <Image src={comment?.avatar} alt={comment.fullname} width={44} height={44} />
      </div>
      <div className={cx('commentItem-main')}>
        <div className={cx('commentItem-content')}>
          {isEditing ? (
            <CommentAddEdit
              toggleOpenEdit={toggleOpenEditTextAreaHandler}
              initialComment={comment}
            />
          ) : (
            <>
              <span className={cx('commentItem-name')}>{comment.fullname || 'Unknown'}</span>
              <p className={cx('commentItem-desc')}>{comment.content}</p>
            </>
          )}
          {renderCommentReactions()}
        </div>

        <div className={cx('commentItem-actions')}>
          <EmojisReactions emojis={emojis} handleChangeEmojis={handleChangeEmojis} />
          {currentUser?.uid === comment.userId && (
            <>
              <button
                className={cx('commentItem-actionEdit')}
                onClick={toggleOpenEditTextAreaHandler}
              >
                Edit
              </button>
              <button className={cx('commentItem-actionDelete')} onClick={handleDeleteComment}>
                Delete
              </button>
            </>
          )}
          <span>{checkTimeAgo((comment?.createdAt?.seconds as number) * 1000)}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

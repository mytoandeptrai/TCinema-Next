import classNames from 'classnames/bind';
import { EmojisReactions } from 'components/EmojisReactions';
import { Image } from 'components/Image';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import useModal from 'hooks/useModal';
import { db } from 'libs/firebase-app';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from 'stores';
import { IComment } from 'types';
import { checkTimeAgo } from 'utils/timeFormat';
import { CommentAddEdit } from '../CommentAddEdit';
import styles from './CommentItem.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { defaultAvatar } from 'constants/global';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { ModalUserReactions } from 'components/ModalCustomize';

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

  const handleChangeEmojis = useCallback(
    async (value: string) => {
      try {
        const collectionRef = doc(db, 'comments', comment.id);
        if (!currentUser || myReaction?.reaction === value) return null;

        if (!myReaction) {
          comment.reactions.push({
            id: uuidv4(),
            userId: currentUser.uid,
            avatar: currentUser.photoURL || defaultAvatar,
            fullname: currentUser.displayName,
            reaction: value
          });
          await updateDoc(collectionRef, { reactions: comment.reactions });
          setEmojis(value);
          return;
        }

        comment.reactions[foundMyReactionIndex].reaction = value;
        await updateDoc(collectionRef, { reactions: comment.reactions });
        setEmojis(value);
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
    [comment, currentUser, myReaction, foundMyReactionIndex]
  );

  const handleDeleteComment = useCallback(() => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const colRef = doc(db, 'comments', comment.id);
          await deleteDoc(colRef);
          toast.success('Delete comment successfully!');
        } catch (error: any) {
          toast.error(error?.message);
        }
      }
    });
  }, [comment]);

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
              isEdit={isEditing}
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
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              <button className={cx('commentItem-actionDelete')} onClick={handleDeleteComment}>
                Delete
              </button>
            </>
          )}
          <span>{checkTimeAgo((comment?.createdAt?.seconds as number) * 1000)}</span>
        </div>
      </div>
      <ModalUserReactions
        isShowModal={isShow}
        toggleModal={toggleModal}
        reactions={comment.reactions}
      />
    </div>
  );
};

export default CommentItem;

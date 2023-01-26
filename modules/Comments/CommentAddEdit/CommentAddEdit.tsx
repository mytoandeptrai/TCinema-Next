import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'stores';
import { toast } from 'react-hot-toast';
import styles from './CommentAddEdit.module.scss';
import classNames from 'classnames/bind';
import { Image } from 'components/Image';
import { defaultAvatar } from 'constants/global';
import { TextArea } from 'components/TextCustomize';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from 'libs/firebase-app';
import { IComment } from 'types';

const cx = classNames.bind(styles);

type Props = {
  initialComment?: IComment;
  toggleOpenEdit?: () => void;
  isEdit?: boolean;
};

const CommentAddEdit = ({ initialComment, toggleOpenEdit = () => {}, isEdit = false }: Props) => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [commentValue, setCommentValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const textAreaClassName = cx('commentForm-textArea', 'scrollbar', {
    'commentForm-textAreaEdit': isEdit
  });

  const resizeTextAreaHandler = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    if (initialComment?.content) {
      setCommentValue(initialComment.content);
    }
  }, [initialComment]);

  useEffect(() => {
    if (!isEdit) {
      resizeTextAreaHandler();
    }
  }, [commentValue, isEdit]);

  const handleSubmitFormValue = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!currentUser) {
        toast.error('Please sign in!');
        return;
      }

      if (!commentValue) {
        toast.error('Please input comment!');
        return;
      }

      try {
        if (isEdit && initialComment) {
          const colRef = doc(db, 'comments', initialComment?.id);
          await updateDoc(colRef, { content: commentValue.trim() });
          return;
        }

        const colRef = collection(db, 'comments');
        await addDoc(colRef, {
          userId: currentUser.uid,
          avatar: currentUser.photoURL || defaultAvatar,
          fullname: currentUser.displayName,
          content: commentValue.trim(),
          createdAt: serverTimestamp(),
          categoryId: router.query.category,
          movieId: router.query.id,
          episodeId: router.query.episode || 0,
          reactions: []
        });

        toast.success(`${isEdit ? 'Edit' : 'Add'} comment successfully!`);
      } catch (error: any) {
        console.log('error: ', error);
        toast.error(error?.message);
      } finally {
        if (isEdit) {
          toggleOpenEdit();
        } else {
          setCommentValue('');
        }
      }
    },
    [currentUser, commentValue, isEdit, initialComment, router, toggleOpenEdit]
  );

  const renderEditorTextArea = () => {
    if (!isEdit) {
      return (
        <>
          <div className={cx('commentForm-add')}>
            <Image
              src={currentUser?.photoURL || defaultAvatar}
              alt={currentUser?.displayName}
              className={cx('commentForm-avatar')}
            />
            <TextArea
              rows={1}
              value={commentValue}
              placeholder="Write comment..."
              onKeyDown={(e) => e.stopPropagation()}
              onKeyUp={(e) => e.stopPropagation()}
              onChange={(e) => setCommentValue(e.target.value)}
              className={textAreaClassName}
            />
          </div>
          <button type="submit" className={cx('commentForm-btn')}>
            {isEdit ? 'Save' : 'Post'}
          </button>
        </>
      );
    }

    return (
      <div className={cx('commentForm-edit')}>
        <div className={cx('commentForm-edit__textArea')}>
          <TextArea
            rows={1}
            value={commentValue}
            placeholder="Write comment..."
            onKeyDown={(e) => e.stopPropagation()}
            onKeyUp={(e) => e.stopPropagation()}
            onChange={(e) => setCommentValue(e.target.value)}
            className={textAreaClassName}
            onKeyPress={(e) => e.stopPropagation()}
          />
        </div>

        <div className={cx('commentForm-actions')}>
          <button type="submit" className={cx('commentForm-btn', 'commentForm-submit')}>
            Update
          </button>
        </div>
      </div>
    );
  };

  return (
    <form className={isEdit ? '' : cx('commentForm-container')} onSubmit={handleSubmitFormValue}>
      {renderEditorTextArea()}
    </form>
  );
};

export default CommentAddEdit;

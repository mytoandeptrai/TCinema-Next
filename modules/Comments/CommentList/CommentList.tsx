import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './CommentList.module.scss';
import classNames from 'classnames/bind';
import { Unsubscribe } from 'firebase/auth';
import { IComment } from 'types';
import { toast } from 'react-hot-toast';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'libs/firebase-app';
import { CommentAddEdit } from '../CommentAddEdit';
import { CommentItem } from '../CommentItem';

const cx = classNames.bind(styles);

const CommentList = () => {
  const router = useRouter();
  const { id, category, episode } = router.query;
  const [commentsList, setCommentsList] = useState<IComment[]>();
  console.log('🚀 ~ file: CommentList.tsx:19 ~ CommentList ~ commentsList', commentsList);

  useEffect(() => {
    let unSubscribe: Unsubscribe;
    (async () => {
      try {
        if (!id) return;

        const collectionRef = collection(db, 'comments');
        const queryCollectionRef = query(collectionRef, where('movieId', '==', id));
        unSubscribe = onSnapshot(queryCollectionRef, (snapshot) => {
          const results: IComment[] = [];
          snapshot.forEach((doc: any) => {
            results.push({
              id: doc.id,
              ...doc.data()
            });
          });

          setCommentsList(results);
        });
      } catch (error: any) {
        toast.error(error?.message);
        setCommentsList([]);
      }
    })();
    return () => unSubscribe();
  }, [id, category, episode]);

  return (
    <div className={cx('commentList-container')}>
      <h4 className={cx('commentList-heading')}>Comments</h4>
      <CommentAddEdit />
      <div className={cx('commentList-content')}>
        {commentsList?.length === 0
          ? null
          : commentsList?.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
};

export default CommentList;

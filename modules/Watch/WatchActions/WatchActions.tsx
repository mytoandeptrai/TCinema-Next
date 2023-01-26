import classNames from 'classnames/bind';
import React, { useCallback } from 'react';
import styles from './WatchActions.module.scss';
import { useRouter } from 'next/router';
import { server } from 'configs/server';
import { copyToClipBoard } from 'utils/common';
import { useAppDispatch, useAppSelector } from 'stores';
import { IconBell, IconShare } from 'components/Icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'libs/firebase-app';
import { setFollows } from 'stores/slices/follow';
import { toast } from 'react-hot-toast';

const cx = classNames.bind(styles);

type Props = {
  id: string;
  title: string;
  domainType: number;
  poster: string;
};

const WatchActions = ({ domainType, id, poster, title }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { follows } = useAppSelector((state) => state.follows);
  const foundMovieIndex = follows?.findIndex((movie) => movie.id === id);

  const handleShare = useCallback(
    () => copyToClipBoard(`${server}${router.pathname}`),
    [router.pathname]
  );

  const handleClickFollowMovie = useCallback(async () => {
    if (!currentUser) return;
    const colRef = doc(db, 'users', currentUser.uid);
    if (foundMovieIndex !== -1) {
      const newFollows = follows.filter((movie) => movie.id !== id);
      await updateDoc(colRef, { follows: newFollows });
      dispatch(setFollows(newFollows));
      toast.success('This movie is removed from your follows');
      return;
    }

    const newFollows = [{ id, domainType, title, poster }, ...follows];
    await updateDoc(colRef, { follows: newFollows });
    dispatch(setFollows(newFollows));
    toast.success('This movie is now followed');
  }, [currentUser, foundMovieIndex, id, follows, dispatch, domainType, title, poster]);

  return (
    <div className={cx('watchActions-container')}>
      <button
        onClick={handleClickFollowMovie}
        className={cx('watchActions-btn')}
        style={{ backgroundColor: foundMovieIndex === -1 ? '#0e6f6a' : '#e5525e' }}
      >
        <IconBell />
      </button>
      <button onClick={handleShare} className={cx('watchActions-btn', 'watchActions-btn_share')}>
        <IconShare fill="#fff" height={20} width={20} />
        <span>Share</span>
      </button>
    </div>
  );
};

export default WatchActions;

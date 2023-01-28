import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'stores';
import { IFollow } from 'types';
import { Unsubscribe } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'libs/firebase-app';
import { LayoutPrimary } from 'layouts';
import { Meta } from 'components/Meta';
import { IconEmptyFollow } from 'components/Icons';
import { MovieCard, MovieList } from 'modules/Movies';

const Follow = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [followsList, setFollowsList] = useState<IFollow[]>([]);

  useEffect(() => {
    let unSubscribe: Unsubscribe;
    (async () => {
      try {
        if (!currentUser?.uid) return;

        const collectionRef = collection(db, 'users');
        const queryCollectionRef = query(collectionRef, where('uid', '==', currentUser?.uid));
        unSubscribe = onSnapshot(queryCollectionRef, (snapshot) => {
          let results: IFollow[] = [];
          snapshot.forEach((doc: any) => {
            results = [...doc.data().follows];
          });

          setFollowsList(results);
          return;
        });
      } catch (error: any) {
        toast.error(error?.message);
        setFollowsList([]);
      }
    })();
    return () => {
      unSubscribe && unSubscribe();
    };
  }, [currentUser]);

  const renderFollowedMovies = () => {
    if (followsList.length === 0) {
      return (
        <div className="section-empty">
          <IconEmptyFollow />
          <span>No follow movie found</span>
        </div>
      );
    }

    return (
      <MovieList>
        {followsList.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            domainType={movie.domainType}
            poster={movie.poster}
          />
        ))}
      </MovieList>
    );
  };

  return (
    <LayoutPrimary>
      <Meta title="Follow - TCinema" />
      <div className="container">{renderFollowedMovies()}</div>
    </LayoutPrimary>
  );
};

export default Follow;

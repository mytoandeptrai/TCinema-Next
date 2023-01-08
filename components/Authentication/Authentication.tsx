import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from 'libs/firebase-app';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'stores';
import { setCurrentUser } from 'stores/slices/auth';

type Props = {
  children: React.ReactNode;
};

const Authentication = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(setCurrentUser(null));
        return;
      }

      const docRef = query(collection(db, 'users'), where('email', '==', user.email));
      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach(async (document) => {
          const userData = document.data();
          dispatch(
            setCurrentUser({
              uid: userData.uid,
              email: userData.email,
              photoURL: userData.photoURL,
              displayName: userData.displayName,
              role: userData.role,
              status: userData.status,
              emailVerified: user.emailVerified
            })
          );
          //   dispatch(setFollows(userData.follows));
        });
      });
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default Authentication;

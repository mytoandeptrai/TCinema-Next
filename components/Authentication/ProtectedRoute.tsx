import { PATH } from 'constants/path';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from 'stores';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push(`${PATH.signIn}?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [currentUser, router]);

  return <>{children}</>;
};

export default ProtectedRoute;

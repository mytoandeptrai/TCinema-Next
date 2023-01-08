import { userRole } from 'constants/global';
import { PATH } from 'constants/path';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from 'stores';
import ProtectedRoute from './ProtectedRoute';

type Props = {
  children: React.ReactNode;
};

const CheckAdmin = ({ children }: Props) => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser?.role !== userRole.ADMIN) router.push(PATH.pageNotFound);
  }, [currentUser, router]);

  return <ProtectedRoute>{currentUser?.role === userRole.ADMIN ? children : null}</ProtectedRoute>;
};

export default CheckAdmin;

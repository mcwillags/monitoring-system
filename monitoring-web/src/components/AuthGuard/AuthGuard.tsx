import { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@hooks';

import { selectIsAuth } from '@store/auth/auth.selectors';

interface AuthGuardProps {
  onAuthPath?: string;
  onNonAuthPath?: string;
  isNeedsAuth: boolean;
}

export const AuthGuard = ({
  children,
  onAuthPath,
  onNonAuthPath,
  isNeedsAuth,
}: PropsWithChildren<AuthGuardProps>) => {
  const isAuth = useAppSelector(selectIsAuth);

  if (!isNeedsAuth) {
    if (isAuth && onAuthPath) return <Navigate to={onAuthPath} />;
    else return <>{children}</>;
  }

  if (!isAuth && onNonAuthPath) return <Navigate to={onNonAuthPath} />;

  return <>{children}</>;
};

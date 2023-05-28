import { PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@hooks';

import { selectAuthRole } from '@store/auth/auth.selectors';

interface RoleGuardProps {
  allowedRole: string;
  alternativePath: string;
  noRolePath: string;
}

export const RoleGuard = ({
  allowedRole,
  alternativePath,
  noRolePath,
  children,
}: PropsWithChildren<RoleGuardProps>) => {
  const userRole = useAppSelector(selectAuthRole);

  if (!userRole) return <Navigate to={noRolePath} />;

  if (allowedRole !== userRole) return <Navigate to={alternativePath} />;

  return <>{children}</>;
};

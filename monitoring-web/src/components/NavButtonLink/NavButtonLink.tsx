import { PropsWithChildren } from 'react';

import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';

import { Button } from '@mui/material';

export const NavButtonLink = ({ children, to }: PropsWithChildren<NavLinkProps>) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink to={to}>
      <Button variant={isActive ? 'outlined' : 'text'}>{children}</Button>
    </NavLink>
  );
};

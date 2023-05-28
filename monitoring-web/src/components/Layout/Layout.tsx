import { PropsWithChildren } from 'react';

import { Box } from '@mui/material';

import { Header } from '../Header';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};
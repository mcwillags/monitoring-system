import { Link } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { APP_ROUTES } from '@router/constants';

export const ErrorPage = () => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%' }}
    >
      <Box>
        <Box sx={{ mb: 3 }}>
          <img src='https://www.acarnet.com/assets/images/acarnet-404.gif' alt='Error page' />
        </Box>
        <Typography sx={{ textAlign: 'center', fontSize: 18 }}>Something went wrong.</Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button component={Link} to={APP_ROUTES.INDEX} sx={{ px: 4, py: 2 }}>
            Go back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

import { useEffect, useState } from 'react';

import { useAppDispatch } from '@hooks';

import { proceedAuth } from '@store/auth/auth.action.creators';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


export const StartingScreen = () => {
  const [showScreen, setShowScreen] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(proceedAuth());

    setTimeout(() => {
      setShowScreen(false);
    }, 1000);
  }, []);

  return (
    <>
      {showScreen ? (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            background: '#fff',
            zIndex: 20,
          }}
        >
          <Box sx={{ background: 'fff' }}>
            <CircularProgress />
          </Box>
        </Box>
      ) : null}
    </>
  );
};

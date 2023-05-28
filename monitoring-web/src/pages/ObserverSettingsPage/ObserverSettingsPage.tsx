import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { useErrorHandling } from '@context/ErrorHandlingContext';

import { selectObserverError } from '@store/observer/observer.selectors';
import { clearObserverError } from '@store/observer/observer.slice';

import { Box, Stack } from '@mui/material';
import { ChangePasswordForm } from './components';

export const ObserverSettingsPage = () => {
  const observerError = useAppSelector(selectObserverError);
  const dispatch = useAppDispatch();
  const { createError } = useErrorHandling();

  useEffect(() => {
    if (!observerError) return;

    createError(observerError);
    dispatch(clearObserverError());
  }, [observerError]);

  return (
    <Stack sx={{ py: 3, px: 2, alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: '720px' }}>
        <ChangePasswordForm />
      </Box>
    </Stack>
  );
};

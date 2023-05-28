import { Box, Button, Paper } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@hooks';

import { logOut } from '@store/auth/auth.action.creators';
import { selectUserIsObserver } from '@store/auth/auth.selectors';
import { clearAdminState } from '@store/admin/admin.slice';
import { clearObserverState } from '@store/observer/observer.slice';

import { ObserverControls } from './components';

import Logo from '@assets/logo.svg';

export const Header = () => {
  const dispatch = useAppDispatch();
  const isObserver = useAppSelector(selectUserIsObserver);

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(clearObserverState());
    dispatch(clearAdminState());
  };

  const observerControls = isObserver ? <ObserverControls /> : null;

  return (
    <Paper
      component='header'
      sx={{ px: 4, py: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <Box>
        <img src={Logo} alt='Image Logo' />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
        {observerControls}
        <Button onClick={handleLogOut} variant='contained' color='error'>
          Вийти
        </Button>
      </Box>
    </Paper>
  );
};

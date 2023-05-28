import { useForm } from 'react-hook-form';

import { useAppDispatch, useBooleanToggle } from '@hooks';

import { ChangePasswordCredentials } from '@models';

import { changeObserverPassword } from '@store/observer/observer.action.creators';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const ChangePasswordForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordCredentials>();
  const dispatch = useAppDispatch();
  const [isShowPassword, togglePassword] = useBooleanToggle(false);
  const [isShowNewPassword, toggleNewPassword] = useBooleanToggle(false);

  const handleFormSubmit = (data: ChangePasswordCredentials) => {
    dispatch(changeObserverPassword(data));
  };

  return (
    <Paper elevation={3}>
      <Stack
        spacing={3}
        sx={{ px: 4, py: 4 }}
        component={'form'}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Box>
          <Typography fontSize={24}>Змінити пароль</Typography>
        </Box>

        <FormControl error={!!errors.password?.message} fullWidth variant='outlined'>
          <InputLabel htmlFor='user-password-id'>Введіть ваш пароль</InputLabel>
          <OutlinedInput
            id='user-password-id'
            type={isShowPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Це поле є обов\'язковим',
              minLength: {
                value: 6,
                message: 'Довжина цього поля має бути більшою ніж 6 символів',
              },
            })}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => togglePassword()}
                  onMouseDown={() => togglePassword()}
                  edge='end'
                >
                  {isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Введіть ваш пароль'
          />
          <FormHelperText id='component-error-text'>{errors.password?.message}</FormHelperText>
        </FormControl>

        <FormControl error={!!errors.newPassword?.message} fullWidth variant='outlined'>
          <InputLabel htmlFor='user-new-password-id'>Введіть новий пароль</InputLabel>
          <OutlinedInput
            id='user-new-password-id'
            type={isShowNewPassword ? 'text' : 'password'}
            {...register('newPassword', {
              required: 'Це поле є обов\'язковим',
              minLength: {
                value: 6,
                message: 'Довжина цього поля має бути більшою ніж 6 символів',
              },
            })}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => toggleNewPassword()}
                  onMouseDown={() => toggleNewPassword()}
                  edge='end'
                >
                  {isShowNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Введіть новий пароль'
          />
          <FormHelperText id='component-error-text'>{errors.newPassword?.message}</FormHelperText>
        </FormControl>

        <Button type='submit' variant='contained' sx={{ py: 2 }}>
          Змінити пароль
        </Button>
      </Stack>
    </Paper>
  );
};

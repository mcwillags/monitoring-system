import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector, useBooleanToggle } from '@hooks';
import { useErrorHandling } from '@context/ErrorHandlingContext';

import { RegisterAdminCredentials } from '@models';

import { selectAuthError, selectAuthIsLoading } from '@store/auth/auth.selectors';
import { registerAdmin } from '@store/auth/auth.action.creators';
import { clearAuthError } from '@store/auth/auth.slice';

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

import { APP_ROUTES } from '@router/constants';

const emailRegexp = /^[^\s@]{2,}@[^.\s@]{2,}\.[^\s@]{2,}$/;

export const RegisterAdminPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterAdminCredentials>({
    defaultValues: {
      email: '',
      password: '',
      registerCode: '',
    },
  });

  const [isShowPassword, togglePassword] = useBooleanToggle(false);
  const { createError } = useErrorHandling();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectAuthIsLoading);

  useEffect(() => {
    if (!error) return;

    createError(error);
    dispatch(clearAuthError());
  }, [error]);

  const onSubmit = (data: RegisterAdminCredentials) => {
    dispatch(registerAdmin(data));
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ px: 3, py: 2, height: '100%', display: 'grid', placeItems: 'center' }}>
        <Paper sx={{ maxWidth: '550px', width: '100%', px: 3, py: 2 }} elevation={5}>
          <Box sx={{ mb: 2 }}>
            <Typography fontSize={24}>Зареєструватись як адмін</Typography>
          </Box>
          <Stack spacing={3} component={'form'} noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormControl error={!!errors.email?.message} sx={{ width: '100%' }} variant='outlined'>
              <InputLabel htmlFor='email-id'>Введіть пошту</InputLabel>
              <OutlinedInput
                id='email-id'
                aria-describedby='component-error-text'
                {...register('email', {
                  required: 'Це поле є обов\'язковим',
                  minLength: {
                    value: 6,
                    message: 'Довжина цього поля має бути більшою ніж 6 символів',
                  },
                  pattern: { value: emailRegexp, message: 'Введіть коректний формат пошти' },
                })}
                label='Введіть пошту'
              />
              <FormHelperText id='component-error-text'>{errors.email?.message}</FormHelperText>
            </FormControl>

            <FormControl
              variant='outlined'
              sx={{ width: '100%' }}
              error={!!errors.password?.message}
            >
              <InputLabel htmlFor='outlined-adornment-password'>Введіть пароль</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
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
                label='Введіть пароль'
              />
              <FormHelperText id='component-error-text'>{errors.password?.message}</FormHelperText>
            </FormControl>

            <FormControl
              error={!!errors.registerCode?.message}
              sx={{ width: '100%' }}
              variant='outlined'
            >
              <InputLabel htmlFor='register-code-id'>Введіть код для реєстрації</InputLabel>
              <OutlinedInput
                id='register-code-id'
                aria-describedby='component-error-text'
                {...register('registerCode', {
                  required: 'Це поле є обов\'язковим',
                })}
                label='Введіть код для реєстрації'
              />
              <FormHelperText id='component-error-text'>
                {errors.registerCode?.message}
              </FormHelperText>
            </FormControl>

            <Button
              variant='contained'
              fullWidth
              type='submit'
              sx={{ py: '0.8rem' }}
              disabled={isLoading}
            >
              Продовжити
            </Button>

            <Box sx={{ mt: 3 }}>
              <Box>
                <Typography component={Link} to={APP_ROUTES.LOGIN_OBSERVER}>
                  Ввійти як наглядач.
                </Typography>
              </Box>
              <Box>
                <Typography component={Link} to={APP_ROUTES.LOGIN_ADMIN}>
                  Ввійти як адмін.
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

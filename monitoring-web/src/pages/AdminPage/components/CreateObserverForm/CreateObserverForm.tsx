import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector, useBooleanToggle } from '@hooks';
import { useErrorHandling } from '@context/ErrorHandlingContext';

import { CreateObserver } from '@models';

import {
  selectAdminAvailableRegions,
  selectAdminError,
  selectIsAdminCreatingObserver,
} from '@store/admin/admin.selectors';
import { clearAdminError } from '@store/admin/admin.slice';
import { createObserver } from '@store/admin/admin.action.creators';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const emailRegexp = /^[^\s@]{2,}@[^.\s@]{2,}\.[^\s@]{2,}$/;

export const CreateObserverForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateObserver>({
    defaultValues: {
      region: '',
      email: '',
      password: '',
    },
  });
  const [isShowPassword, togglePassword] = useBooleanToggle(false);
  const { createError } = useErrorHandling();
  const isLoading = useAppSelector(selectIsAdminCreatingObserver);
  const error = useAppSelector(selectAdminError);
  const availableRegions = useAppSelector(selectAdminAvailableRegions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!error) return;

    createError(error);
    dispatch(clearAdminError());
  }, [error]);

  const handleFormSubmit = (data: CreateObserver) => {
    dispatch(createObserver(data));
    reset();
  };

  const selectItems = availableRegions.map((item) => (
    <MenuItem value={item} key={item}>
      {item}
    </MenuItem>
  ));

  return (
    <Paper sx={{ width: '100%', maxWidth: '720px' }}>
      <Stack
        spacing={3}
        component={'form'}
        noValidate
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ px: 2, py: 4 }}
      >
        <Box>
          <Typography fontSize={24}>Створити нового наглядача</Typography>
        </Box>
        <FormControl error={!!errors.email?.message} fullWidth variant='outlined'>
          <InputLabel htmlFor='email-id'>Введіть пошту</InputLabel>
          <OutlinedInput
            id='email-id'
            aria-describedby='component-error-text'
            {...register('email', {
              required: "Це поле є обов'язковим",
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

        <FormControl variant='outlined' fullWidth error={!!errors.password?.message}>
          <InputLabel htmlFor='outlined-adornment-password'>Введіть пароль</InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={isShowPassword ? 'text' : 'password'}
            {...register('password', {
              required: "Це поле є обов'язковим",
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

        <FormControl error={!!errors.region?.message}>
          <InputLabel id='demo-simple-select-label'>Виберіть область</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            {...register('region', { required: 'Виберіть одну з областей' })}
            label='Виберіть область'
          >
            {selectItems}
          </Select>
          <FormHelperText id='component-error-text'>{errors.region?.message}</FormHelperText>
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
      </Stack>
    </Paper>
  );
};

import { ChangeEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { useErrorHandling } from '@context/ErrorHandlingContext';

import {
  selectAdminAvailableRegions,
  selectAdminError,
  selectAdminObservers,
  selectIsAdminLoadingObservers,
} from '@store/admin/admin.selectors';
import { clearAdminError } from '@store/admin/admin.slice';
import { getAdminAvailableRegions, getAdminObservers } from '@store/admin/admin.action.creators';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CreateObserverForm, Observer } from './components';
import { BubbleLoader } from '@components';

const UNSELECTED_REGION = 'Не вибрано';

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const availableRegions = useAppSelector(selectAdminAvailableRegions);
  const observers = useAppSelector(selectAdminObservers);
  const isObserversLoading = useAppSelector(selectIsAdminLoadingObservers);
  const [selectedRegion, setSelectedRegion] = useState(UNSELECTED_REGION);
  const [query, setQuery] = useState('');
  const { createError } = useErrorHandling();
  const error = useAppSelector(selectAdminError);

  useEffect(() => {
    dispatch(getAdminAvailableRegions());
    dispatch(getAdminObservers());
  }, []);

  useEffect(() => {
    if (!error) return;

    dispatch(clearAdminError());
    createError(error);
  }, [error]);

  const selectItems = [UNSELECTED_REGION, ...availableRegions].map((item) => (
    <MenuItem value={item} key={item}>
      {item}
    </MenuItem>
  ));

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedRegion(event.target.value);
  };

  const handleQueryChange = (event: ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setQuery(value);
  };

  const observerItems = isObserversLoading ? (
    <BubbleLoader />
  ) : (
    observers.map((observer) => {
      if (selectedRegion === UNSELECTED_REGION && query === '')
        return <Observer key={observer._id} {...observer} />;

      const queryRegexp = new RegExp(query);

      if (selectedRegion !== UNSELECTED_REGION) {
        return queryRegexp.test(observer.email) && observer.region === selectedRegion ? (
          <Observer {...observer} key={observer._id} />
        ) : null;
      }
    })
  );

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <CreateObserverForm />
      </Box>
      <Stack spacing={3} sx={{ px: 4, py: 3, alignItems: 'center' }}>
        <Typography fontSize={24} sx={{ textAlign: 'center' }}>
          Наглядачі присутні в системі:
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '720px' }}>
          <Box component={'form'} sx={{ display: 'flex', gap: 3 }}>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel id='demo-simple-select-label'>Відфільтрувати за регіоном</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Відфільтрувати за регіоном'
                value={selectedRegion}
                onChange={handleSelectChange}
              >
                {selectItems}
              </Select>
            </FormControl>

            <TextField onChange={handleQueryChange} label='Відфільтрувати за поштою' />
          </Box>
        </Box>

        <Stack
          spacing={3}
          sx={{
            width: '100%',
            maxWidth: '720px',
          }}
        >
          {observerItems}
        </Stack>
      </Stack>
    </Box>
  );
};

import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector, useBooleanToggle } from '@hooks';
import { useErrorHandling } from '@context/ErrorHandlingContext';
import { AudioContextProvider } from '@context/AudioContext';

import { MonitoredData, ValidatedMonitoredData } from '@models';

import {
  selectObserverBrigades,
  selectObserverError,
  selectObserverMonitoringBrigade,
} from '@store/observer/observer.selectors';
import { getObserverBrigades } from '@store/observer/observer.action.creators';
import { selectObserverRegion } from '@store/auth/auth.selectors';
import { clearObserverError } from '@store/observer/observer.slice';

import { onReceiveData } from '@src/sockets/utils';

import { validatedMonitoredData } from '@utils';

import { Box, Button, Stack, Typography } from '@mui/material';
import { BrigadeForm, MonitoringData } from './components';

export const ObserverPage = () => {
  const dispatch = useAppDispatch();
  const observerError = useAppSelector(selectObserverError);
  const brigades = useAppSelector(selectObserverBrigades);
  const region = useAppSelector(selectObserverRegion);
  const monitoringBrigade = useAppSelector(selectObserverMonitoringBrigade);
  const { createError } = useErrorHandling();

  const [monitoredData, setMonitoredData] = useState<ValidatedMonitoredData[]>([]);
  const [isSortData, toggleSort] = useBooleanToggle(false);

  useEffect(() => {
    if (brigades.length) return;

    dispatch(getObserverBrigades({ region }));
  }, []);

  useEffect(() => {
    if (!monitoringBrigade) {
      toggleSort(false);
      setMonitoredData([]);
      return;
    }
    onReceiveData((data) => {
      handleAddNewData(data);
    });
  }, [monitoringBrigade]);

  const handleAddNewData = (newData: MonitoredData) => {
    setMonitoredData((prev) => {
      const isExisting = prev.find((data) => data.badgeNumber === newData.badgeNumber);

      if (isExisting) {
        return prev.map((data) =>
          data.badgeNumber === newData.badgeNumber ? validatedMonitoredData(newData) : data,
        );
      }

      return [...prev, validatedMonitoredData(newData)];
    });
  };

  useEffect(() => {
    if (!observerError) return;

    createError(observerError);
    dispatch(clearObserverError());
  }, [observerError]);

  const sortButton = monitoringBrigade ? (
    isSortData ? (
      <Button onClick={() => toggleSort()} variant='contained' color='warning'>
        Не сортувати
      </Button>
    ) : (
      <Button onClick={() => toggleSort()} variant='contained'>
        Сортувати за рівнем небезпеки
      </Button>
    )
  ) : null;

  return (
    <AudioContextProvider>
      <Box sx={{ px: 4, py: 3 }}>
        <Stack spacing={3}>
          <Typography fontSize={32} fontWeight={700}>
            Моніторинг
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <BrigadeForm />
            {sortButton}
          </Box>

          <Box>
            <MonitoringData data={monitoredData} isSorting={isSortData} />
          </Box>
        </Stack>
      </Box>
    </AudioContextProvider>
  );
};

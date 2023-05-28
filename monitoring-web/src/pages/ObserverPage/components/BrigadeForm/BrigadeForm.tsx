import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';

import {
  selectObserverMonitoringBrigade,
  selectObserverBrigades,
  selectObserverConnectionRoom,
} from '@store/observer/observer.selectors';
import { setMonitoringBrigade, setObserverConnectionRoom } from '@store/observer/observer.slice';
import { selectObserverRegion } from '@store/auth/auth.selectors';

import {
  connectToRoom,
  disconnectFromRoom,
  getConnectionCode,
  requestConnectionCode,
} from '@src/sockets/utils';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const DEFAULT_SELECT_VALUE = 'Не вибрано';

export const BrigadeForm = () => {
  const brigades = useAppSelector(selectObserverBrigades);
  const region = useAppSelector(selectObserverRegion);
  const monitoringBrigade = useAppSelector(selectObserverMonitoringBrigade);
  const [brigade, setBrigade] = useState(monitoringBrigade ?? DEFAULT_SELECT_VALUE);
  const connectionCode = useAppSelector(selectObserverConnectionRoom);
  const dispatch = useAppDispatch();

  const handleChangeBrigade = (event: SelectChangeEvent) => {
    setBrigade(event.target.value);
  };
  const handleStartMonitoring = () => {
    if (brigade === DEFAULT_SELECT_VALUE) return;

    requestConnectionCode(region, brigade);

    getConnectionCode((connectionCode) => {
      if (connectionCode) {
        connectToRoom(connectionCode);
        dispatch(setObserverConnectionRoom(connectionCode));
      }
    });

    dispatch(setMonitoringBrigade(brigade));
  };

  const handleStopMonitoring = () => {
    if (connectionCode) {
      disconnectFromRoom(connectionCode);
    }

    dispatch(setMonitoringBrigade(null));
  };

  const selectItems = [DEFAULT_SELECT_VALUE, ...brigades].map((brigadeNumber) => (
    <MenuItem value={brigadeNumber} key={brigadeNumber}>
      {brigadeNumber}
    </MenuItem>
  ));

  const buttonItem = monitoringBrigade ? (
    <Button onClick={handleStopMonitoring} variant='contained' color='error'>
      Перестати відстежувати
    </Button>
  ) : (
    <Button
      onClick={handleStartMonitoring}
      variant='contained'
      disabled={brigade === DEFAULT_SELECT_VALUE}
    >
      Почати відстежувати
    </Button>
  );

  return (
    <Box component={'form'} sx={{ display: 'flex', gap: 3, maxWidth: '550px', width: '100%' }}>
      <FormControl sx={{ flex: 1 }}>
        <InputLabel id='demo-simple-select-label'>Виберіть бригаду</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Виберіть бригаду'
          onChange={handleChangeBrigade}
          defaultValue={monitoringBrigade || DEFAULT_SELECT_VALUE}
          disabled={!!monitoringBrigade}
        >
          {selectItems}
        </Select>
      </FormControl>
      {buttonItem}
    </Box>
  );
};

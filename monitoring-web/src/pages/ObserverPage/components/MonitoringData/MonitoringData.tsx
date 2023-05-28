import { ValidatedMonitoredData } from '@models';

import FavoriteIcon from '@mui/icons-material/Favorite';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { Box, Stack, Typography } from '@mui/material';
import { MonitoredItem } from '../MonitoredItem';

interface MonitoringDataProps {
  data: ValidatedMonitoredData[];
  isSorting: boolean;
}

export const MonitoringData = ({ data, isSorting }: MonitoringDataProps) => {
  const monitoredItems = (
    isSorting
      ? data.sort(({ dangerLevel: firstDangerLevel }, { dangerLevel: secondDangerLevel }) =>
          secondDangerLevel > firstDangerLevel ? 1 : -1,
        )
      : data
  ).map((monitoredItem) => <MonitoredItem key={monitoredItem.badgeNumber} {...monitoredItem} />);

  return (
    <Box sx={{ width: '100%', borderTop: '1px solid rgba(0,0,0, 0.5)', py: 3 }}>
      <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <Box sx={tableHeaderContainerSx}>
          <Typography sx={tableHeaderSx}>Номер значка</Typography>
        </Box>
        <Box sx={tableHeaderContainerSx}>
          <Typography sx={tableHeaderSx}>Повне ім&apos;я</Typography>
        </Box>
        <Box sx={tableHeaderContainerSx}>
          <FavoriteIcon color='error' />
          <Typography sx={tableHeaderSx}>Рівень серцебиття</Typography>
        </Box>
        <Box sx={tableHeaderContainerSx}>
          <WaterDropIcon color='primary' />
          <Typography sx={tableHeaderSx}>Рівень кисню</Typography>
        </Box>
        <Box sx={tableHeaderContainerSx}>
          <DeviceThermostatIcon color='warning' />
          <Typography sx={tableHeaderSx}>Рівень температури</Typography>
        </Box>
      </Box>
      <Stack spacing={2} sx={{ py: 4, width: '100%' }}>
        {monitoredItems}
      </Stack>
    </Box>
  );
};

const tableHeaderContainerSx = {
  px: 2,
  py: 2,
  borderLeft: '1px solid rgba(0,0,0, 0.5)',
  borderRight: '1px solid rgba(0,0,0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
};

const tableHeaderSx = {
  textAlign: 'center',
  fontWeight: 'bold',
};

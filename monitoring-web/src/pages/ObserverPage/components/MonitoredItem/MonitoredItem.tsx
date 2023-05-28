import { useEffect } from 'react';

import { useAudioPlayer } from '@context/AudioContext';

import { ValidatedMonitoredData } from '@models';

import { formatTemperature } from '@utils';

import { Box, Paper, Typography } from '@mui/material';

export const MonitoredItem = ({
  name,
  oxygenLevel,
  temperatureLevel,
  heartRateLevel,
  badgeNumber,
}: ValidatedMonitoredData) => {
  const { startPlaying } = useAudioPlayer();

  const isDangerLevel =
    oxygenLevel.dangerLevel === 1 ||
    temperatureLevel.dangerLevel === 1 ||
    heartRateLevel.dangerLevel === 1;

  useEffect(() => {
    if (isDangerLevel) {
      startPlaying();
    }
  }, [isDangerLevel]);

  const backgroundColor = isDangerLevel ? 'rgba(255,0,0,0.2)' : null;

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        backgroundColor,
      }}
    >
      <Box sx={cellItemSx}>
        <Typography sx={{ fontSize: 18 }}>{badgeNumber}</Typography>
      </Box>
      <Box sx={cellItemSx}>
        <Typography sx={{ fontSize: 18 }}>{name}</Typography>
      </Box>

      <Box sx={cellItemSx}>
        <Box sx={{ backgroundColor: heartRateLevel.backgroundColor, ...valueContainerSx }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 18, color: '#000' }}>
            {heartRateLevel.value}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>
            max {heartRateLevel.maxHeartRateLevel}
          </Typography>
        </Box>
      </Box>

      <Box sx={cellItemSx}>
        <Box sx={{ backgroundColor: oxygenLevel.backgroundColor, ...valueContainerSx }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 18, color: '#000' }}>
            {oxygenLevel.value}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}>
            min {oxygenLevel.minOxygenLevel}
          </Typography>
        </Box>
      </Box>

      <Box sx={cellItemSx}>
        <Box sx={{ backgroundColor: temperatureLevel.backgroundColor, ...valueContainerSx }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 18, color: '#000' }}>
            {formatTemperature(temperatureLevel.value)}
          </Typography>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: 14,
              color: '#000',
            }}
          >
            max {temperatureLevel.maxTemperatureLevel}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const cellItemSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  py: 3,
};

const valueContainerSx = {
  px: 2,
  py: 1,
  borderRadius: 5,
  display: 'flex',
  gap: 1,
  alignItems: 'baseline',
};

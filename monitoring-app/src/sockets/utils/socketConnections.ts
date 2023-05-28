import { IUser, MonitoringSettings } from '@models';

import { socket } from '../socket';

export const requestConnection = (region: string, brigadeNumber: string) => {
  socket.emit('request-connection-code', { region, brigadeNumber });
};

export const receiveConnectionCode = (callback: (connectionCode: string) => void) => {
  socket.on('receive-connection-code', callback);
};

export const connectToRoom = (room: string) => {
  socket.emit('connect-to-room', room);
};

export const disconnectFromRoom = (room: string) => {
  socket.off('receive-connection-code');
  socket.emit('disconnect-from-room', room);
};

export const sendSocketData = (
  user: IUser,
  data: any,
  monitoringSettings: MonitoringSettings,
  room: string
) => {
  socket.emit('send-data', {
    data: {
      badgeNumber: user.badgeNumber,
      name: user.fullName,
      oxygenLevel: { minOxygenLevel: monitoringSettings.minOxygenLevel, value: data.oxygen },
      heartRateLevel: {
        maxHeartRateLevel: monitoringSettings.maxHeartRateLevel,
        value: data.heartRate,
      },
      temperatureLevel: {
        maxTemperatureLevel: monitoringSettings.maxTemperatureLevel,
        value: data.temperature,
      },
    },
    room,
  });
};
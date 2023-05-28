import { socket } from '../socket';

import { MonitoredData } from '@models';

export const requestConnectionCode = (region: string, brigadeNumber: string) => {
  socket.emit('request-connection-code', { region, brigadeNumber });
};
export const getConnectionCode = (callback: (connectionCode: string) => void) => {
  socket.on('receive-connection-code', callback);
};

export const connectToRoom = (room: string) => {
  socket.emit('connect-to-room', room);
};

export const disconnectFromRoom = (room: string) => {
  socket.off('receive-connection-code');
  socket.off('send-data');
  socket.emit('disconnect-from-room', room);
};

export const onReceiveData = (callback: (data: MonitoredData) => void) => {
  socket.on('send-data', callback);
};

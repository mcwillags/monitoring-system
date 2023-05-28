import { io } from 'socket.io-client';
import { environment } from '@src/environment';

export const socket = io(environment.baseApiUrl, { reconnectionAttempts: 5 });

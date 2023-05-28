import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { generateConnectionCode } from '../common/utils';

@WebSocketGateway({
  cors: true,
})
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit(): any {
    this.server.on('connection', () => {});
  }

  @SubscribeMessage('request-connection-code')
  handleCreateConnectionCode(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body,
  ) {
    const roomId = generateConnectionCode(body);
    socket.emit('receive-connection-code', roomId);
  }

  @SubscribeMessage('connect-to-room')
  handleConnectToRoom(@ConnectedSocket() socket: Socket, @MessageBody() room) {
    socket.join(room);
  }

  @SubscribeMessage('disconnect-from-room')
  handleDisconnectedFromRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() room: string,
  ) {
    socket.leave(room);
  }

  @SubscribeMessage('send-data')
  handleReceiveData(@ConnectedSocket() socket, @MessageBody() { room, data }) {
    socket.to(room).emit('send-data', data);
  }
}

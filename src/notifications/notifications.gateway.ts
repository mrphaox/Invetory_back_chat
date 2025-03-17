import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './DTO/notifications.dto';


@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationsService: NotificationsService) {}

  @SubscribeMessage('sendNotification')
  async handleSendNotification(@MessageBody() createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationsService.createNotification(createNotificationDto);
    this.server.to(createNotificationDto.userId).emit('notification', notification);
    return notification;
  }
}

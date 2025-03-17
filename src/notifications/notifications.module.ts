  import { Module } from '@nestjs/common';
  import { NotificationsService } from './notifications.service';
  import { NotificationsGateway } from './notifications.gateway';
  import { NotificationsController } from './notifications.controller';
  import { MongooseModule } from '@nestjs/mongoose';
import { UserNotification, UserNotificationSchema } from './schemas/notification.schema';

  @Module({
    imports: [MongooseModule.forFeature([{ name: UserNotification.name, schema: UserNotificationSchema }])],
    controllers: [NotificationsController],
    providers: [NotificationsService, NotificationsGateway],
  })
  export class NotificationsModule {}

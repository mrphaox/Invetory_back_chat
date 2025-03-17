import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserNotification, UserNotificationDocument } from './schemas/notification.schema';
import { CreateNotificationDto } from './DTO/notifications.dto';


@Injectable()
export class NotificationsService {
  constructor(@InjectModel(UserNotification.name) private notificationModel: Model<UserNotificationDocument>) {}

  async createNotification(createNotificationDto: CreateNotificationDto): Promise<UserNotification> {
    const notification = new this.notificationModel(createNotificationDto);
    return notification.save();
  }

  async getUserNotifications(userId: string): Promise<UserNotification[]> {
    return this.notificationModel.find({ userId, read: false }).sort({ createdAt: -1 }).exec();
  }

  async markAsRead(id: string): Promise<{ message: string }> {
    const notification = await this.notificationModel.findById(id);
    if (!notification) throw new NotFoundException('Notificación no encontrada');

    notification.read = true;
    await notification.save();
    return { message: 'Notificación marcada como leída' };
  }
}

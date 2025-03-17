import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserNotificationDocument = UserNotification & Document;

@Schema({ timestamps: true })
export class UserNotification {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  read: boolean;
}

export const UserNotificationSchema = SchemaFactory.createForClass(UserNotification);

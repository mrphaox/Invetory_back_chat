import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  sender: string; // ID del usuario que envía el mensaje

  @Prop({ required: true })
  receiver: string; // ID del usuario que recibe el mensaje

  @Prop({ required: true })
  content: string; // Texto del mensaje

  @Prop()
  fileUrl?: string; // URL del archivo adjunto (opcional)

  @Prop({ default: false })
  edited: boolean; // Indica si el mensaje fue editado

  @Prop({ default: false })
  deleted: boolean; // Indica si el mensaje fue eliminado
}

export const MessageSchema = SchemaFactory.createForClass(Message);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  userId: string; // Usuario que publica

  @Prop({ required: true })
  content: string; // Texto de la publicación

  @Prop({ type: [String], default: [] })
  images: string[]; // URLs de imágenes

  @Prop({ type: [String], default: [] })
  likes: string[]; // Usuarios que han dado like
}

export const PostSchema = SchemaFactory.createForClass(Post);

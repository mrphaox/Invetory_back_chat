import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostCommentDocument = PostComment & Document;

@Schema({ timestamps: true })
export class PostComment {
  @Prop({ required: true })
  postId: string; // ID de la publicación a la que pertenece el comentario

  @Prop({ required: true })
  userId: string; // ID del usuario que hizo el comentario

  @Prop({ required: true })
  content: string; // Contenido del comentario
}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);

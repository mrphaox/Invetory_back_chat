import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  sender: string; // ID del usuario que envía el mensaje

  @IsNotEmpty()
  @IsString()
  receiver: string;

  @IsNotEmpty()
  @IsString()
  content: string; // Texto del mensaje

  @IsOptional()
  @IsString()
  fileUrl?: string; // URL del archivo adjunto (opcional)
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsNotEmpty()
  @IsString()
  id: string; // ID del mensaje a editar

  @IsOptional()
  @IsString()
  content?: string; // Nuevo contenido del mensaje

  @IsOptional()
  @IsString()
  fileUrl?: string; // Nueva URL del archivo adjunto (opcional)
}

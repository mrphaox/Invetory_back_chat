import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}

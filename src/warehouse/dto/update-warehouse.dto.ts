import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateWarehouseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  employees?: string[];
}

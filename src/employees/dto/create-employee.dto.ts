import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  warehouseId: string;

  @IsNotEmpty()
  @IsString()
  role: string; // "admin" o "employee"
}

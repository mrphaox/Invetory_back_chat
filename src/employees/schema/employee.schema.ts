import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  warehouseId: string; // ID de la bodega a la que pertenece el empleado

  @Prop({ default: 'employee' }) // "admin" o "employee"
  role: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

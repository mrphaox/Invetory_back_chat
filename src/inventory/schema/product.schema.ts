import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string; // Tipo de producto (Electrónico, Ropa, Alimentos, etc.)

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  warehouseId: string; // Relación con la bodega donde está almacenado
}

export const ProductSchema = SchemaFactory.createForClass(Product);

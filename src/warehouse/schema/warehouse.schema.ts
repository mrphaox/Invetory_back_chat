import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WarehousesController } from './../warehouse.controller';

export type WarehouseDocument = Warehouse & Document;

@Schema({timestamps:true})
export class Warehouse {
    
    @Prop({required:true, unique: true})
    name:string;
    
    @Prop({required:true})
    location: string;

    @Prop({default:[]})
    employees: string[];
    
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
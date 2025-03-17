import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse, WarehouseDocument } from './schema/warehouse.schema';

@Injectable()
export class WarehousesService {
  constructor(@InjectModel(Warehouse.name) private warehouseModel: Model<WarehouseDocument>) {}

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return new this.warehouseModel(createWarehouseDto).save();
  }

  async findAll(): Promise<Warehouse[]> {
    return this.warehouseModel.find().exec();
  }

  async findById(id: string): Promise<Warehouse> {
    const warehouse = await this.warehouseModel.findById(id);
    if (!warehouse) throw new NotFoundException('Bodega no encontrada');
    return warehouse;
  }

  async update(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse> {
    const updatedWarehouse = await this.warehouseModel.findByIdAndUpdate(id, updateWarehouseDto, { new: true });
    if (!updatedWarehouse) throw new NotFoundException('Bodega no encontrada');
    return updatedWarehouse;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedWarehouse = await this.warehouseModel.findByIdAndDelete(id);
    if (!deletedWarehouse) throw new NotFoundException('Bodega no encontrada');
    return { message: 'Bodega eliminada' };
  }
}

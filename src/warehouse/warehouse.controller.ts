import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehousesService } from './warehouse.service';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post()
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehousesService.create(createWarehouseDto);
  }

  @Get()
  async findAll() {
    return this.warehousesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.warehousesService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehousesService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.warehousesService.delete(id);
  }
}

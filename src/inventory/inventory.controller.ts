import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.inventoryService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.inventoryService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.inventoryService.update(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.inventoryService.delete(id);
  }
}

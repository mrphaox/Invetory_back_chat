import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';

@Module({
  imports:[ MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])],
  providers: [InventoryService ],
  controllers: [InventoryController]
})
export class InventoryModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './schema/warehouse.schema';
import { WarehousesController } from './warehouse.controller';
import { WarehousesService } from './warehouse.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: Warehouse.name, schema: WarehouseSchema }])],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}

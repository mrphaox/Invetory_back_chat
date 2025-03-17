import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheModule } from './config/redis.config';
import { DatabaseModule } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { InventoryModule } from './inventory/inventory.module';
import { WarehousesModule } from './warehouse/warehouse.module';
import { EmployeesModule } from './employees/employees.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Variables de entorno disponibles globalmente
    DatabaseModule,
    RedisCacheModule,
    AuthModule,
    ChatModule,
    NotificationsModule,
    PostsModule,
    CommentsModule,
    InventoryModule,
    WarehousesModule,
    EmployeesModule,
  ],
})
export class AppModule {}

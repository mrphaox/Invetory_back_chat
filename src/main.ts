import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname,'..','uploads'));

  await app.listen(port);
  console.log(`\x1b[32m[Nest] 🚀 Application is running on: http://localhost:${port}\x1b[0m`);
}

bootstrap();

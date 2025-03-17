import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  // Llamada única para habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API de Inventario y Chat')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    .addBearerAuth() // Permite autenticación con JWT en Swagger
    .build();

  // Aquí podrías inicializar Swagger si lo necesitas:
  // SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(port);
  console.log(`\x1b[32m[Nest] 🚀 Application is running on: http://localhost:${port}\x1b[0m`);
}

bootstrap();

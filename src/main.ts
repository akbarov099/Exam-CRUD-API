import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({
    origin: 'https://your-frontend-domain.com', 
    methods: 'GET, POST, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, 
    methods: 'GET, POST, PATCH, DELETE',  
    allowedHeaders: 'Content-Type, Authorization',  
  });

  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin:['http://localhost:3000'],
    credentials:true
  });
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();

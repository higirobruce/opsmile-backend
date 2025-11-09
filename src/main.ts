import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  app.enableCors({
    origin: true, // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.enableCors(
    {
    origin: ['http://localhost:3001', 'https://myfrontend.example.com'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true, // allow cookies, Authorization headers, etc.
  }
);

  //enable swagger
  await app.listen(process.env.PORT ?? 9999);
}
bootstrap();

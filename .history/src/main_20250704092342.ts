import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: ['http://localhost:3001', 'https://myfrontend.example.com'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true, // allow cookies, Authorization headers, etc.
});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");//all endpoints are accessiblbe through api eg. api/recipe
  app.enableCors({
    origin: 'http://localhost:5173'
  });
  await app.listen(8000);
}
bootstrap();

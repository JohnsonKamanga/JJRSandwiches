import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");//all endpoints are accessiblbe through api eg. api/recipe
  app.enableCors({
    origin: 'https://jjr-sandwiches.vercel.app'
  });
  await app.listen(8000);
}
bootstrap();

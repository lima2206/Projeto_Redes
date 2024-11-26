import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the dist/frontend directory
  app.useStaticAssets(join(__dirname, '..', 'dist', 'frontend'));

  await app.listen(3000);
}
bootstrap();
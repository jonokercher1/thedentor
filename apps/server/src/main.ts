import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BodyValidationPipe } from './common/pipes/BodyValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  app.useGlobalPipes(new BodyValidationPipe());

  await app.listen(4000);
}

bootstrap();

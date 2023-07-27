import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BodyValidationPipe } from './common/pipes/BodyValidationPipe';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  app.useGlobalPipes(new BodyValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), { excludeExtraneousValues: true }));

  await app.listen(4000);
}

bootstrap();

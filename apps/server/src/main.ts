import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { BodyValidationPipe } from '@/common/pipes/body-validation-pipe';
import { ClassSerializerInterceptor } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.enableCors({
    origin: process.env.WEB_APP_URL, // TODO: may need to remove this when we open to a public api (new app maybe?)
    allowedHeaders: ['Content-Type', 'Accept'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(new BodyValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), { excludeExtraneousValues: true }),
  );
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();

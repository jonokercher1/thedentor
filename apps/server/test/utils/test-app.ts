import { IPaymentProvider } from '@/payment/types/payment-provider';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TestPaymentProvider } from './test-payment-provider';
import { BodyValidationPipe } from '@/common/pipes/body-validation-pipe';
import { Reflector } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as cookieParser from 'cookie-parser';
import ConsoleEmailProvider from '@/notification/channels/email/providers/console-email.provider';
import { IEmailNotificationProvider } from '@/notification/channels/email/email-notification.provider';

// TODO: This isnt ideal as we have to maintain this alongside the prod app - we should control this from a config file instead
export default class TestApp {
  private _instance: INestApplication;

  public async init() {
    await this.createTestingModule();
    await this.initGlobalPipes();
    await this.initGlobalInterceptors();
    await this.instance.init();

    return this.instance;
  }

  private async createTestingModule() {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IPaymentProvider)
      .useClass(TestPaymentProvider)
      .overrideProvider(IEmailNotificationProvider)
      .useClass(ConsoleEmailProvider)
      .compile();

    this.instance = moduleRef.createNestApplication();
  }

  private async initGlobalPipes() {
    this.instance.use(cookieParser());
    this.instance.useGlobalPipes(new BodyValidationPipe());
  }

  private async initGlobalInterceptors() {
    this.instance.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.instance.get(Reflector), { excludeExtraneousValues: true }),
    );
  }

  private get instance() {
    return this._instance;
  }

  private set instance(instance: INestApplication) {
    this._instance = instance;
  }
}
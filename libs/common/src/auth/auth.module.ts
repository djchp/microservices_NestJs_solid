import { Module } from '@nestjs/common/decorators';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import * as cookieParser from 'cookie-parser';
import { RmqModule } from '../rmq/rmq.module';

@Module({
  imports: [RmqModule.register({ name: 'AUTH' })],
  exports: [RmqModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}

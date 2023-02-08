import { Module } from '@nestjs/common';
import { LeasesController } from './leases.controller';
import { LeasesService } from './leases.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { LeasesRepository } from './leases.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Lease, LeaseSchema } from './schemas/lease.schema';
import { AuthModule } from '@app/common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/leases/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Lease.name, schema: LeaseSchema }]),
    RmqModule.register({
      name: 'PAYMENTS',
    }),
    AuthModule,
  ],
  controllers: [LeasesController],
  providers: [LeasesService, LeasesRepository],
})
export class LeasesModule {}

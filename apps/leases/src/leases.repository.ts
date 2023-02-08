import { AbstractRepository } from '@app/common';
import { Injectable } from '@nestjs/common/decorators';
import { Logger } from '@nestjs/common/services';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Lease } from './schemas/lease.schema';

@Injectable()
export class LeasesRepository extends AbstractRepository<Lease> {
  protected readonly logger = new Logger(LeasesRepository.name);

  constructor(
    @InjectModel(Lease.name) leaseModel: Model<Lease>,
    @InjectConnection() connection: Connection,
  ) {
    super(leaseModel, connection);
  }
}

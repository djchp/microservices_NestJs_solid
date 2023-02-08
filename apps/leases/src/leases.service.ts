import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateLeaseRequest } from './dto/create-lease.request';
import { LeasesRepository } from './leases.repository';

@Injectable()
export class LeasesService {
  constructor(
    private readonly leasesRepository: LeasesRepository,
    @Inject('PAYMENTS') private paymentsClient: ClientProxy,
  ) {}

  async createLease(request: CreateLeaseRequest, authentication: string) {
    const lease = await this.leasesRepository.create(request);
    await lastValueFrom(
      this.paymentsClient.emit('lease_created', {
        request,
        Authentication: authentication
      }),
    );
    return lease;
  }

  async getLeases() {
    return this.leasesRepository.find({});
  }
}

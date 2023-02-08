import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  private readonly payservice = new Logger(PaymentsService.name)

  dataToSubmitPayment(data: any) {
    this.payservice.log('Payments for', data)
  }
}

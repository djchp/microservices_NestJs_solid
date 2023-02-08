import { RmqService } from '@app/common';
import { JwtAuthGuard } from '@app/common/auth/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService, private readonly rmqService: RmqService) {}

  @EventPattern('lease_created')
  @UseGuards(JwtAuthGuard)
  async handleLeaseCreated(@Payload() data: any, @Ctx() context:RmqContext) {
    console.log("current user is", data.user)
    this.paymentsService.dataToSubmitPayment(data)
    this.rmqService.acknowledge(context)
  }
}

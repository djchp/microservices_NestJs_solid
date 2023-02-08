import { JwtAuthGuard } from '@app/common/auth/jwt-auth.guard';
import { Controller, Get } from '@nestjs/common';
import { Body, Post, Req, UseGuards } from '@nestjs/common/decorators';
import { Payload } from '@nestjs/microservices';
import { CreateLeaseRequest } from './dto/create-lease.request';
import { LeasesService } from './leases.service';

@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createLease(@Body() request: CreateLeaseRequest, @Req() req: any) {
    // console.log(req.user);
    return this.leasesService.createLease(request, req.cookies?.Authentication);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getLeases(@Payload() data: any) {
    console.log(data)
    return this.leasesService.getLeases();
  }
}

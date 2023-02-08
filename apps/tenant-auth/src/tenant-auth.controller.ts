import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TenantAuthService } from './tenant-auth.service';
import { User } from './users/schemas/user.schema';

@Controller('tenant-auth')
export class TenantAuthController {
  constructor(private readonly tenantAuthService: TenantAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.tenantAuthService.login(user, response);
    response.send(user);  
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user') 
  async validate_user(@CurrentUser() user: User) {
    return user
  }
}

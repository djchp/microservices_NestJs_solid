import { Test, TestingModule } from '@nestjs/testing';
import { TenantAuthController } from './tenant-auth.controller';
import { TenantAuthService } from './tenant-auth.service';

describe('TenantAuthController', () => {
  let tenantAuthController: TenantAuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TenantAuthController],
      providers: [TenantAuthService],
    }).compile();

    tenantAuthController = app.get<TenantAuthController>(TenantAuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(tenantAuthController.getHello()).toBe('Hello World!');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { LeasesController } from './leases.controller';
import { LeasesService } from './leases.service';

describe('LeasesController', () => {
  let leasesController: LeasesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LeasesController],
      providers: [LeasesService],
    }).compile();

    leasesController = app.get<LeasesController>(LeasesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(leasesController.getHello()).toBe('Hello World!');
    });
  });
});

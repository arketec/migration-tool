import { Test, TestingModule } from '@nestjs/testing';
import { MigrationTrackingService } from './migration-tracking.service';

describe('MigrationTrackingService', () => {
  let service: MigrationTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrationTrackingService],
    }).compile();

    service = module.get<MigrationTrackingService>(MigrationTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

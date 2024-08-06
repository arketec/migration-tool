import { Test, TestingModule } from '@nestjs/testing';
import { MigrationTrackingMongodbService } from './migration-tracking-mongodb.service';

describe('MigrationTrackingMongodbService', () => {
  let service: MigrationTrackingMongodbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrationTrackingMongodbService],
    }).compile();

    service = module.get<MigrationTrackingMongodbService>(
      MigrationTrackingMongodbService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

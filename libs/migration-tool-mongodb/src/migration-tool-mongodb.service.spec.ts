import { Test, TestingModule } from '@nestjs/testing';
import { MigrationToolMongodbService } from './migration-tool-mongodb.service';

describe('MigrationToolMongodbService', () => {
  let service: MigrationToolMongodbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrationToolMongodbService],
    }).compile();

    service = module.get<MigrationToolMongodbService>(
      MigrationToolMongodbService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

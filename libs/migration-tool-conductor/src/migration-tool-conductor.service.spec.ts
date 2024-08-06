import { Test, TestingModule } from '@nestjs/testing';
import { MigrationToolConductorService } from './migration-tool-conductor.service';

describe('MigrationToolConductorService', () => {
  let service: MigrationToolConductorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrationToolConductorService],
    }).compile();

    service = module.get<MigrationToolConductorService>(
      MigrationToolConductorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

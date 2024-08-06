import { Test, TestingModule } from '@nestjs/testing';
import { MigrationToolConsulService } from './migration-tool-consul.service';

describe('MigrationToolConsulService', () => {
  let service: MigrationToolConsulService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrationToolConsulService],
    }).compile();

    service = module.get<MigrationToolConsulService>(MigrationToolConsulService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

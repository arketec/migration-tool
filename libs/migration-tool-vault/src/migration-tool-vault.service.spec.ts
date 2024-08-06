import { Test, TestingModule } from '@nestjs/testing';
import { MigrationToolVaultService } from './migration-tool-vault.service';

describe('MigrationToolVaultService', () => {
  let service: MigrationToolVaultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrationToolVaultService],
    }).compile();

    service = module.get<MigrationToolVaultService>(MigrationToolVaultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

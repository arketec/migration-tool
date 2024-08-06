import { Module } from '@nestjs/common';
import { MigrationToolVaultService } from './migration-tool-vault.service';

@Module({
  providers: [MigrationToolVaultService],
  exports: [MigrationToolVaultService],
})
export class MigrationToolVaultModule {}

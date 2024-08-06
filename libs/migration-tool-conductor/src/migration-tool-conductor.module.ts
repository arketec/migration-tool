import { Module } from '@nestjs/common';
import { MigrationToolConductorService } from './migration-tool-conductor.service';

@Module({
  providers: [MigrationToolConductorService],
  exports: [MigrationToolConductorService],
})
export class MigrationToolConductorModule {}

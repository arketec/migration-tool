import { Module } from '@nestjs/common';
import { MigrationToolConsulService } from './migration-tool-consul.service';

@Module({
  providers: [MigrationToolConsulService],
  exports: [MigrationToolConsulService],
})
export class MigrationToolConsulModule {}

import { Module } from '@nestjs/common';
import { MigrationToolMongodbService } from './migration-tool-mongodb.service';

@Module({
  providers: [MigrationToolMongodbService],
  exports: [MigrationToolMongodbService],
})
export class MigrationToolMongodbModule {}

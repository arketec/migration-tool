import { Module } from '@nestjs/common';
import { MigrationTrackingMongodbService } from './migration-tracking-mongodb.service';

@Module({
  providers: [MigrationTrackingMongodbService],
  exports: [MigrationTrackingMongodbService],
})
export class MigrationTrackingMongodbModule {}

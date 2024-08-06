import { Module } from '@nestjs/common';
import { MigrationTrackingService } from './migration-tracking.service';

@Module({
  providers: [MigrationTrackingService],
  exports: [MigrationTrackingService],
})
export class MigrationTrackingModule {}

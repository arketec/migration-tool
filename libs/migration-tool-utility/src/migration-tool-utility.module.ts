import { Module } from '@nestjs/common';
import { FilesystemModule } from '../../../src/filesystem/filesystem.module';
import { ScriptReaderModule } from './script-reader/script-reader.module';

@Module({
  providers: [],
  exports: [],
  imports: [ScriptReaderModule, FilesystemModule],
})
export class MigrationToolUtilityModule {}

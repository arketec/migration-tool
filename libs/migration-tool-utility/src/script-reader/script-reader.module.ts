import { Module } from '@nestjs/common';
import { FilesystemModule } from '../../../../src/filesystem/filesystem.module';
import { ScriptReaderJsModule } from '../script-reader-js/script-reader-js.module';
import { ScriptReaderJsonModule } from '../script-reader-json/script-reader-json.module';
import { ScriptReaderTsModule } from '../script-reader-ts/script-reader-ts.module';
import { ScriptReaderService } from './script-reader.service';

@Module({
  imports: [
    FilesystemModule,
    ScriptReaderJsonModule,
    ScriptReaderJsModule,
    ScriptReaderTsModule,
  ],
  providers: [ScriptReaderService],
  exports: [ScriptReaderService],
})
export class ScriptReaderModule {}

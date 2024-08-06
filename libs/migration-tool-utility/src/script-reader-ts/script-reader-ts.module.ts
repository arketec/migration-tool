import { Module } from '@nestjs/common';
import { ScriptReaderJsModule } from '../script-reader-js/script-reader-js.module';
import { ScriptReaderTsService } from './script-reader-ts.service';

@Module({
  imports: [ScriptReaderJsModule],
  providers: [ScriptReaderTsService],
  exports: [ScriptReaderTsService],
})
export class ScriptReaderTsModule {}

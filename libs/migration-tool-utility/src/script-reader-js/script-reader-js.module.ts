import { Module } from '@nestjs/common';
import { ScriptReaderJsService } from './script-reader-js.service';

@Module({
  providers: [ScriptReaderJsService],
  exports: [ScriptReaderJsService],
})
export class ScriptReaderJsModule {}

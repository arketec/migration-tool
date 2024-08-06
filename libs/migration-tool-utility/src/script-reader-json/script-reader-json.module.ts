import { Module } from '@nestjs/common';
import { ScriptReaderJsonService } from './script-reader-json.service';

@Module({
  providers: [ScriptReaderJsonService],
  exports: [ScriptReaderJsonService],
})
export class ScriptReaderJsonModule {}

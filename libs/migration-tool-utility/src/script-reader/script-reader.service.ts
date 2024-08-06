import { Injectable } from '@nestjs/common';
import { FilesystemService } from '../../../../src/filesystem/filesystem.service';
import { MigratorLoggerService } from '../../../../src/logger/logger.service';
import {
  IJsonScriptParser,
  IJsScriptParser,
  ITsScriptParser,
} from '../../../migration-tool-common/src';
import { IMigrationFile } from '../../../migration-tool-common/src/IMigrationFile';
import { ScriptReaderJsService } from '../script-reader-js/script-reader-js.service';
import { ScriptReaderJsonService } from '../script-reader-json/script-reader-json.service';
import { ScriptReaderTsService } from '../script-reader-ts/script-reader-ts.service';

@Injectable()
export class ScriptReaderService
  implements IJsonScriptParser<any>, ITsScriptParser<any>, IJsScriptParser<any>
{
  constructor(
    private readonly filesystemService: FilesystemService,
    private readonly jsonService: ScriptReaderJsonService,
    private readonly jsService: ScriptReaderJsService,
    private readonly tsService: ScriptReaderTsService,
    private readonly loggerService: MigratorLoggerService,
  ) {}
  parseJson: (script: string) => Promise<IMigrationFile<any>> =
    this.jsonService.parse.bind(this.jsonService);
  parseTs: (script: string) => Promise<IMigrationFile<any>> =
    this.tsService.parse.bind(this.tsService);
  parseJs: (script: string) => Promise<IMigrationFile<any>> =
    this.jsService.parse.bind(this.jsService);

  async load<TResult = any, TBuilder = any>(
    path: string,
  ): Promise<IMigrationFile<TResult, TBuilder>> {
    const content = await this.filesystemService.tryReadFile(path, (e) => {
      this.loggerService.error(`Failed to read file: ${path}`);
      throw e;
    });
    const extension = path.split('.').pop();
    switch (extension) {
      case 'json':
        return this.parseJson(content);
      case 'ts':
        return this.parseTs(content);
      case 'js':
        return this.parseJs(content);
      default:
        this.loggerService.error(`Unsupported file extension: ${extension}`);
        throw new Error(`Unsupported file extension: ${extension}`);
    }
  }
}

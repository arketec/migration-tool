import { Injectable } from '@nestjs/common';
import {
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget,
  transpileModule,
} from 'typescript';
import { IMigrationFile } from '../../../migration-tool-common/src/IMigrationFile';
import { ScriptReaderJsService } from '../script-reader-js/script-reader-js.service';

@Injectable()
export class ScriptReaderTsService {
  constructor(private readonly jsService: ScriptReaderJsService) {}
  parse(s: string): Promise<IMigrationFile<any>> {
    const transpiledScript = transpileModule(s, {
      compilerOptions: {
        module: ModuleKind.CommonJS,
        moduleResolution: ModuleResolutionKind.NodeJs,
        target: ScriptTarget.ES2019,
        allowJs: true,
        strict: false,
        skipDefaultLibCheck: true,
        skipLibCheck: true,
      },
    }).outputText;
    return Promise.resolve(this.jsService.parse(transpiledScript));
  }
}

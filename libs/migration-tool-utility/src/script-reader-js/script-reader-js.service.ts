import { Injectable } from '@nestjs/common';
import { Script } from 'vm';
import { IMigrationFile } from '../../../migration-tool-common/src/IMigrationFile';

@Injectable()
export class ScriptReaderJsService {
  parse(s: string): Promise<IMigrationFile<any>> {
    return Promise.resolve(this.compileAndGetDefaultExport(s));
  }
  private compileAndGetDefaultExport<T>(src: string): T {
    const script = new Script(src, { filename: 'script.js' });
    const exports: {
      default: T;
    } = {
      default: undefined,
    };
    const sandbox = { exports, require, module, console };
    script.runInNewContext(sandbox);

    return sandbox.exports.default;
  }
}

import { Injectable } from '@nestjs/common';
import { IMigrationFile } from '../../../migration-tool-common/src/IMigrationFile';

@Injectable()
export class ScriptReaderJsonService {
  parse(s: string): Promise<IMigrationFile<any>> {
    return Promise.resolve(JSON.parse(s) as IMigrationFile<any>);
  }
}

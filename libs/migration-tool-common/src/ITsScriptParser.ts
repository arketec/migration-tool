import { IMigrationFile } from './IMigrationFile';

export interface ITsScriptParser<T> {
  parseTs: (script: string) => Promise<IMigrationFile<T>>;
}

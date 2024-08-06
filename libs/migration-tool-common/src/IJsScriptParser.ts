import { IMigrationFile } from './IMigrationFile';

export interface IJsScriptParser<T> {
  parseJs: (script: string) => Promise<IMigrationFile<T>>;
}

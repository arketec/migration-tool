import { IMigrationFile } from './IMigrationFile';

export interface IJsonScriptParser<T> {
  parseJson: (script: string) => Promise<IMigrationFile<T>>;
}

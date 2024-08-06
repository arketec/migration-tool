export type MigrationType<TResult, TBuilder = any> =
  | ((
      builder: TBuilder,
      env?: string,
      ...args: any[]
    ) => TResult | Promise<TResult>)
  | TResult;
export interface IMigrationFile<TResult, TBuilder = any> {
  up: MigrationType<TResult, TBuilder>;
  down: MigrationType<TResult, TBuilder>;
  name: string;
  timestamp: number;
  path: string;
  hash: string;
}

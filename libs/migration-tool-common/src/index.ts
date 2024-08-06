import { ICreateCommand } from './ICreateCommand';
import { IDiffCommand } from './IDiffCommand';
import { IDownCommand } from './IDownCommand';
import { IHelpCommand } from './IHelpCommand';
import { IStatusCommand } from './IStatusCommand';
import { IUpCommand } from './IUpCommand';
import { OnInitialization } from './OnInitialization';
export * from './IJsonScriptParser';
export * from './IJsScriptParser';
export * from './IMigration';
export * from './IMigrationStorageConfig';
export * from './ITsScriptParser';
export * from './ITypeComparable';

export {
  ICreateCommand,
  IDiffCommand,
  IDownCommand,
  IHelpCommand,
  IStatusCommand,
  IUpCommand,
  OnInitialization,
};

export interface IMigrationTool
  extends ICreateCommand,
    IDiffCommand,
    IDownCommand,
    IHelpCommand,
    IStatusCommand,
    IUpCommand,
    OnInitialization {}

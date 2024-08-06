import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  Scope,
} from '@nestjs/common';
import * as chalk from 'chalk';

@Injectable({ scope: Scope.TRANSIENT })
export class MigratorLoggerService
  extends ConsoleLogger
  implements LoggerService
{
  log(message: any, ...optionalParams: any[]) {
    super.log(
      chalk.green(message),
      optionalParams.length ? optionalParams : undefined,
    );
  }
  error(message: any, ...optionalParams: any[]) {
    super.error(
      chalk.red(message),
      optionalParams.length ? optionalParams : undefined,
    );
  }
  warn(message: any, ...optionalParams: any[]) {
    super.warn(
      chalk.yellow(message),
      optionalParams.length ? optionalParams : undefined,
    );
  }
  debug(message: any, ...optionalParams: any[]) {
    super.debug(
      chalk.blue(message),
      optionalParams.length ? optionalParams : undefined,
    );
  }
  verbose(message: any, ...optionalParams: any[]) {
    super.log(
      chalk.cyan(message),
      optionalParams.length ? optionalParams : undefined,
    );
  }
  fatal(message: any, ...optionalParams: any[]) {
    super.error(
      chalk.redBright(message),
      optionalParams.length ? optionalParams : undefined,
    );
  }
}

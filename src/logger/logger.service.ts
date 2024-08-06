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
    console.log(chalk.green(message), optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(chalk.red(message), optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(chalk.yellow(message), optionalParams);
  }
  debug(message: any, ...optionalParams: any[]) {
    console.debug(chalk.blue(message), optionalParams);
  }
  verbose(message: any, ...optionalParams: any[]) {
    console.log(chalk.cyan(message), optionalParams);
  }
  fatal(message: any, ...optionalParams: any[]) {
    console.error(chalk.redBright(message), optionalParams);
  }
}

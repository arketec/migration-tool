import { Global, Module } from '@nestjs/common';
import { MigratorLoggerService } from './logger.service';

@Global()
@Module({
  providers: [MigratorLoggerService],
  exports: [MigratorLoggerService],
})
export class LoggerModule {}

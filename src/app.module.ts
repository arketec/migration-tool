import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { FilesystemModule } from './filesystem/filesystem.module';
import { LoggerModule } from './logger/logger.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [CommandsModule, LoggerModule, TemplatesModule, FilesystemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

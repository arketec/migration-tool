import { Module } from '@nestjs/common';
import { FilesystemModule } from '../filesystem/filesystem.module';
import { TemplatesModule } from '../templates/templates.module';
import { InitCommand } from './init.command';

@Module({
  imports: [TemplatesModule, FilesystemModule],
  providers: [InitCommand],
})
export class CommandsModule {}

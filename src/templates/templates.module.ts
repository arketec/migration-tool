import { Module } from '@nestjs/common';
import { render, renderFile } from 'ejs';
import { TEMPLATES_ENGINE, TemplatesProvider } from './templates.provider';
import { TemplatesService } from './templates.service';

@Module({
  providers: [
    {
      provide: TEMPLATES_ENGINE,
      useValue: {
        render,
        renderFile,
      },
    },
    TemplatesService,
    TemplatesProvider,
  ],
  exports: [TemplatesService],
})
export class TemplatesModule {}

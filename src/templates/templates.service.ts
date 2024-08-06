import { Injectable } from '@nestjs/common';
import { TemplateOptions, TemplatesProvider } from './templates.provider';

@Injectable()
export class TemplatesService {
  constructor(private readonly templatesProvider: TemplatesProvider) {}

  render(
    template: string,
    context: Record<string, any>,
    options: TemplateOptions,
  ): string {
    return this.templatesProvider.render(template, context, options);
  }

  renderFile(
    path: string,
    context: Record<string, any>,
    options: TemplateOptions,
  ): Promise<string> {
    return this.templatesProvider.renderFile(path, context, options);
  }

  async tryRenderFile(
    path: string,
    context: Record<string, any>,
    options: TemplateOptions,
    onFailure?: (e: any) => void,
  ): Promise<string | null> {
    try {
      return await this.renderFile(path, context, options);
    } catch (e) {
      onFailure?.(e);
      return null;
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';

export const TEMPLATES_ENGINE = 'TEMPLATES_ENGINE';
export interface TemplatesEngine {
  render(
    template: string,
    context: Record<string, any>,
    options?: TemplateOptions,
  ): string;
  renderFile(
    path: string,
    context: Record<string, any>,
    options?: TemplateOptions,
  ): Promise<string>;
}
export interface TemplateOptions {
  root?: string | string[];
  views?: string[];
  cache?: boolean;
  context?: any;
  delimiter?: string;
  openDelimiter?: string;
  closeDelimiter?: string;
  strict?: boolean;
  debug?: boolean;
  async?: boolean;
  rmWhitespace?: boolean;
}

@Injectable()
export class TemplatesProvider {
  constructor(
    @Inject(TEMPLATES_ENGINE) private readonly engine: TemplatesEngine,
  ) {}

  render(
    template: string,
    context: Record<string, any>,
    options?: TemplateOptions,
  ): string {
    return this.engine.render(template, context, options);
  }

  renderFile(
    path: string,
    context: Record<string, any>,
    options?: TemplateOptions,
  ): Promise<string> {
    return this.engine.renderFile(path, context, options);
  }
}

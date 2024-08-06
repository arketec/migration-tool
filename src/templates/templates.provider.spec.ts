import { Test, TestingModule } from '@nestjs/testing';
import {
  TEMPLATES_ENGINE,
  TemplatesEngine,
  TemplatesProvider,
} from './templates.provider';

describe('Templates', () => {
  let provider: TemplatesProvider;
  let mockEngine: TemplatesEngine;

  beforeEach(async () => {
    mockEngine = {} as any;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesProvider,
        { provide: TEMPLATES_ENGINE, useValue: mockEngine },
      ],
    }).compile();

    provider = module.get<TemplatesProvider>(TemplatesProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should call render', () => {
    mockEngine.render = jest.fn().mockReturnValue('rendered');
    expect(provider.render('template', {}, {})).toBe('rendered');
    expect(mockEngine.render).toHaveBeenCalledWith('template', {}, {});
  });

  it('should call renderFile', async () => {
    mockEngine.renderFile = jest.fn().mockResolvedValue('rendered');
    expect(await provider.renderFile('template', {}, {})).toBe('rendered');
    expect(mockEngine.renderFile).toHaveBeenCalledWith('template', {}, {});
  });
});

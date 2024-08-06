import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesProvider } from './templates.provider';
import { TemplatesService } from './templates.service';

describe('TemplatesService', () => {
  let service: TemplatesService;
  let mockProvider: TemplatesProvider;

  beforeEach(async () => {
    mockProvider = {} as any;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        {
          provide: TemplatesProvider,
          useValue: mockProvider,
        },
      ],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call render', () => {
    mockProvider.render = jest.fn().mockReturnValue('rendered');
    expect(service.render('template', {}, {})).toBe('rendered');
    expect(mockProvider.render).toHaveBeenCalledWith('template', {}, {});
  });

  it('should call renderFile', async () => {
    mockProvider.renderFile = jest.fn().mockResolvedValue('rendered');
    expect(await service.tryRenderFile('template', {}, {})).toBe('rendered');
    expect(mockProvider.renderFile).toHaveBeenCalledWith('template', {}, {});
  });

  it('should try to call renderFile but handle the failure', async () => {
    mockProvider.renderFile = jest.fn().mockRejectedValue('error');
    let error: any;
    expect(
      await service.tryRenderFile('template', {}, {}, (e) => {
        error = e;
      }),
    ).toBe(null);
    expect(mockProvider.renderFile).toHaveBeenCalledWith('template', {}, {});
    expect(error).toBeDefined();
  });
});

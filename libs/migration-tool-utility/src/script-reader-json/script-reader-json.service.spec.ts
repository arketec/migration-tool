import { Test, TestingModule } from '@nestjs/testing';
import { ScriptReaderJsonService } from './script-reader-json.service';

describe('ScriptReaderJsonService', () => {
  let service: ScriptReaderJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScriptReaderJsonService],
    }).compile();

    service = module.get<ScriptReaderJsonService>(ScriptReaderJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse', async () => {
    const result = await service.parse('{ "test": "test" }');
    expect(result).toStrictEqual({ test: 'test' });
  });
});

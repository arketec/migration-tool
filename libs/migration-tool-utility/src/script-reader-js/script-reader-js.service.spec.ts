import { Test, TestingModule } from '@nestjs/testing';
import { ScriptReaderJsService } from './script-reader-js.service';

describe('ScriptReaderJsService', () => {
  let service: ScriptReaderJsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScriptReaderJsService],
    }).compile();

    service = module.get<ScriptReaderJsService>(ScriptReaderJsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse', async () => {
    const result = await service.parse(
      'exports.default = {up: () => { return "test"; }, down: null}',
    );
    expect(result.up()).toEqual('test');
    expect(result.down).toBeNull();
  });
});

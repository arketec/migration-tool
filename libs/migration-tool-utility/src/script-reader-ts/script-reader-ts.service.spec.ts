import { Test, TestingModule } from '@nestjs/testing';
import { ScriptReaderJsModule } from '../script-reader-js/script-reader-js.module';
import { ScriptReaderTsService } from './script-reader-ts.service';

describe('ScriptReaderTsService', () => {
  let service: ScriptReaderTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScriptReaderJsModule],
      providers: [ScriptReaderTsService],
    }).compile();

    service = module.get<ScriptReaderTsService>(ScriptReaderTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse', async () => {
    const result = await service.parse(
      'export default {up: () => { return "test"; }, down: () => null}',
    );
    expect(result.up()).toEqual('test');
    expect(result.down()).toBeNull();
  });
});

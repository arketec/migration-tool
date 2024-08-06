import { Test, TestingModule } from '@nestjs/testing';
import {
  Filesystem,
  FILESYSTEM_SERVICE_TOKEN,
  FilesystemService,
} from '../../../../src/filesystem/filesystem.service';
import { MigratorLoggerService } from '../../../../src/logger/logger.service';
import { ScriptReaderJsModule } from '../script-reader-js/script-reader-js.module';
import { ScriptReaderJsonModule } from '../script-reader-json/script-reader-json.module';
import { ScriptReaderTsModule } from '../script-reader-ts/script-reader-ts.module';
import { ScriptReaderService } from './script-reader.service';

describe('ScriptReaderService', () => {
  let service: ScriptReaderService;
  let fsMock: Filesystem;
  let mockLogger: any;

  beforeEach(async () => {
    fsMock = {
      readFile: jest.fn(),
      writeFile: jest.fn(),
      exists: jest.fn(),
      mkdir: jest.fn(),
      readdir: jest.fn(),
      unlink: jest.fn(),
      rmdir: jest.fn(),
    };
    mockLogger = {
      error: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ScriptReaderJsModule,
        ScriptReaderJsonModule,
        ScriptReaderTsModule,
      ],
      providers: [
        ScriptReaderService,
        {
          provide: FilesystemService,
          useValue: {
            tryReadFile: fsMock.readFile,
          },
        },
        {
          provide: MigratorLoggerService,
          useValue: mockLogger,
        },
      ],
    })
      .overrideProvider(FILESYSTEM_SERVICE_TOKEN)
      .useValue(fsMock)
      .compile();

    service = module.get<ScriptReaderService>(ScriptReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load json', async () => {
    jest
      .spyOn(fsMock, 'readFile')
      .mockResolvedValue('{"up": "test", "down": null}');
    const result = await service.load('test.json');
    expect(result.up).toBe('test');
    expect(result.down).toBeNull();
  });

  it('should load ts', async () => {
    jest
      .spyOn(fsMock, 'readFile')
      .mockResolvedValue(
        'export default {up: () => { return "test"; }, down: null}',
      );
    const result = await service.load('test.ts');
    expect(result.up()).toEqual('test');
    expect(result.down).toBeNull();
  });

  it('should load js', async () => {
    jest
      .spyOn(fsMock, 'readFile')
      .mockResolvedValue(
        'exports.default = {up: () => { return "test"; }, down: null}',
      );
    const result = await service.load('test.js');
    expect(result.up()).toEqual('test');
    expect(result.down).toBeNull();
  });
});

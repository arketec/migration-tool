import { Test, TestingModule } from '@nestjs/testing';
import { Filesystem, FilesystemService } from './filesystem.service';

describe('FilesystemService', () => {
  let service: FilesystemService;
  let fsMock: Filesystem;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesystemService,
        {
          provide: 'FILESYSTEM_SERVICE_TOKEN',
          useValue: fsMock,
        },
      ],
    }).compile();

    service = module.get<FilesystemService>(FilesystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call fs.readFile', async () => {
    await service.tryReadFile('test');
    expect(fsMock.readFile).toHaveBeenCalledWith('test', 'utf8');
  });
  it('should try to call fs.readFile but handle the failure', async () => {
    fsMock.readFile = jest.fn().mockRejectedValue('error');
    let error: any;
    expect(
      await service.tryReadFile('test', (e) => {
        error = e;
      }),
    ).toBe(null);
    expect(fsMock.readFile).toHaveBeenCalledWith('test', 'utf8');
    expect(error).toBeDefined();
  });

  it('should call fs.writeFile', async () => {
    expect(await service.tryWriteFile('test', 'data')).toBe(true);
    expect(fsMock.writeFile).toHaveBeenCalledWith('test', 'data', 'utf8');
  });
  it('should try to call fs.writeFile but handle the failure', async () => {
    fsMock.writeFile = jest.fn().mockRejectedValue('error');
    let error: any;
    expect(
      await service.tryWriteFile('test', 'data', (e) => {
        error = e;
      }),
    ).toBe(false);
    expect(fsMock.writeFile).toHaveBeenCalledWith('test', 'data', 'utf8');
    expect(error).toBeDefined();
  });

  it('should call fs.mkdir', async () => {
    expect(await service.tryMkdir('test')).toBe(true);
    expect(fsMock.mkdir).toHaveBeenCalledWith('test');
  });
  it('should try to call fs.mkdir but handle the failure', async () => {
    fsMock.mkdir = jest.fn().mockRejectedValue('error');
    let error: any;
    expect(
      await service.tryMkdir('test', (e) => {
        error = e;
      }),
    ).toBe(false);
    expect(fsMock.mkdir).toHaveBeenCalledWith('test');
    expect(error).toBeDefined();
  });
});

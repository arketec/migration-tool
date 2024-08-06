import { Test, TestingModule } from '@nestjs/testing';
import { FilesystemService } from '../filesystem/filesystem.service';
import { MigratorLoggerService } from '../logger/logger.service';
import { TemplatesService } from '../templates/templates.service';
import { InitCommand } from './init.command';

describe('InitCommand', () => {
  let command: InitCommand;
  let fsMock: FilesystemService;
  let templatesServiceMock: TemplatesService;
  let loggerServiceMock: any;

  beforeEach(async () => {
    fsMock = {
      readFile: jest.fn(),
      writeFile: jest.fn(),
      tryReadFile: jest.fn(),
      tryWriteFile: jest.fn(),
      mkdir: jest.fn(),
      tryMkdir: jest.fn(),
    } as any;
    templatesServiceMock = {
      render: jest.fn(),
      renderFile: jest.fn(),
      tryRenderFile: jest.fn(),
    } as any;
    loggerServiceMock = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
      fatal: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: FilesystemService,
          useValue: fsMock,
        },
        {
          provide: TemplatesService,
          useValue: templatesServiceMock,
        },
        {
          provide: MigratorLoggerService,
          useValue: loggerServiceMock,
        },
        InitCommand,
      ],
    }).compile();

    command = module.get<InitCommand>(InitCommand);
  });

  it('should be defined', () => {
    expect(command).toBeDefined();
  });

  it('should parseExcludes', () => {
    expect(command.parseExcludes('a,b,c')).toEqual(['a', 'b', 'c']);
    expect(command.parseExcludes('a')).toEqual(['a']);
    expect(command.parseExcludes('')).toEqual([]);
    expect(command.parseExcludes(undefined)).toEqual([]);
  });

  it('should parseOutput', () => {
    expect(command.parseOutput('a')).toEqual('a');
    expect(command.parseOutput(undefined)).toBeUndefined();
  });

  it('should parseForce', () => {
    expect(command.parseForce('true')).toBeTruthy();
    expect(command.parseForce(undefined)).toBeFalsy();
  });

  it('should create migrations directory', async () => {
    jest.spyOn(fsMock, 'tryWriteFile').mockResolvedValue(true);
    await command.run(undefined, {});
    expect(loggerServiceMock.log).toHaveBeenCalledWith(
      'Initializing migration-tool project',
    );
    expect(loggerServiceMock.log).toHaveBeenCalledWith(
      'Adding conductor module',
    );
    expect(loggerServiceMock.log).toHaveBeenCalledWith('Adding consul module');
    expect(loggerServiceMock.log).toHaveBeenCalledWith('Adding mongodb module');
    expect(loggerServiceMock.log).toHaveBeenCalledWith('Adding vault module');

    expect(fsMock.tryMkdir).toHaveBeenCalledTimes(5);

    expect(loggerServiceMock.log).toHaveBeenLastCalledWith(
      expect.stringContaining('migration-tool.config.js'),
    );
  });
  it('should create migrations directory excluding conductor', async () => {
    jest.spyOn(fsMock, 'tryWriteFile').mockResolvedValue(true);
    await command.run(undefined, { excludes: ['conductor'] });
    expect(loggerServiceMock.log).toHaveBeenCalledWith(
      'Initializing migration-tool project',
    );
    expect(loggerServiceMock.log).toHaveBeenCalledWith('Adding consul module');
    expect(loggerServiceMock.log).toHaveBeenCalledWith('Adding mongodb module');
    expect(loggerServiceMock.log).toHaveBeenCalledWith('Adding vault module');

    expect(fsMock.tryMkdir).toHaveBeenCalledTimes(4);

    expect(loggerServiceMock.log).toHaveBeenLastCalledWith(
      expect.stringContaining('migration-tool.config.js'),
    );
  });

  it('should log error if mkdir fails', async () => {
    jest.spyOn(fsMock, 'tryMkdir').mockImplementationOnce((_, onFailure) => {
      onFailure({ code: 'X', message: 'test' });
      return Promise.resolve(false);
    });

    try {
      await command.run(undefined, {});
    } catch (e) {
      expect(e).toEqual({ code: 'X', message: 'test' });
    }

    expect(loggerServiceMock.error).toHaveBeenCalledWith(
      'Failed to create migrations directory: test',
    );
  });
  it('should log if migrations exists', async () => {
    jest.spyOn(fsMock, 'tryMkdir').mockImplementationOnce((_, onFailure) => {
      onFailure({ code: 'EEXIST' });
      return Promise.resolve(false);
    });

    await command.run(undefined, {});
    expect(loggerServiceMock.log).toHaveBeenCalledWith(
      'Migrations directory already exists',
    );
  });
  it('should log error if mkdir fails on a module', async () => {
    jest
      .spyOn(fsMock, 'tryMkdir')
      .mockImplementationOnce(() => Promise.resolve(true))
      .mockImplementationOnce((_, onFailure) => {
        onFailure({ code: 'X', message: 'test' });
        return Promise.resolve(false);
      });

    try {
      await command.run(undefined, {});
    } catch (e) {
      expect(e).toEqual({ code: 'X', message: 'test' });
    }

    expect(loggerServiceMock.error).toHaveBeenCalledWith(
      'Failed to create conductor directory: test',
    );
  });
  it('should log if module exists', async () => {
    jest
      .spyOn(fsMock, 'tryMkdir')
      .mockImplementationOnce(() => Promise.resolve(true))
      .mockImplementationOnce((_, onFailure) => {
        onFailure({ code: 'EEXIST' });
        return Promise.resolve(false);
      });

    await command.run(undefined, {});
    expect(loggerServiceMock.log).toHaveBeenCalledWith(
      'conductor directory already exists',
    );
  });
  it('should log error if if fails to render', async () => {
    jest
      .spyOn(templatesServiceMock, 'tryRenderFile')
      .mockImplementationOnce((_a, _b, _c, onFailure) => {
        onFailure({ code: 'X', message: 'test' });
        return Promise.resolve(null);
      });

    try {
      await command.run(undefined, {});
    } catch (e) {
      expect(e).toEqual({ code: 'X', message: 'test' });
    }

    expect(loggerServiceMock.error).toHaveBeenCalledWith(
      'Failed to render config file: test',
    );
  });
  it('should log error if writeFile fails', async () => {
    jest
      .spyOn(fsMock, 'tryWriteFile')
      .mockImplementationOnce((_, _d, onFailure) => {
        onFailure({ code: 'X', message: 'test' });
        return Promise.resolve(false);
      });

    try {
      await command.run(undefined, {});
    } catch (e) {
      expect(e).toEqual({ code: 'X', message: 'test' });
    }

    expect(loggerServiceMock.error).toHaveBeenCalledWith(
      'Failed to create config file: test',
    );
  });
  it('should log if config exists', async () => {
    jest
      .spyOn(fsMock, 'tryWriteFile')
      .mockImplementationOnce((_, _d, onFailure) => {
        onFailure({ code: 'EEXIST' });
        return Promise.resolve(false);
      });

    await command.run(undefined, {});
    expect(loggerServiceMock.log).toHaveBeenCalledWith(
      'Config file already exists',
    );
  });
});

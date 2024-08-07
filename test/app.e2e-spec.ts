import { TestingModule } from '@nestjs/testing';
import * as fsMock from 'fs';
import { fs, vol } from 'memfs';
import { CommandTestFactory } from 'nest-commander-testing';
import { join } from 'path';
import { promisify } from 'util';
import { FILESYSTEM_SERVICE_TOKEN } from '../src/filesystem/filesystem.service';
import { MigratorLoggerService } from '../src/logger/logger.service';
import { AppModule } from './../src/app.module';
const ROOT = join(__dirname, '..');
describe('App (e2e)', () => {
  let commandInstance: TestingModule;
  let mockLoggerService: MigratorLoggerService;
  const mockFsData = {
    './templates/config.template.ejs': fsMock.readFileSync(
      'templates/config.template.ejs',
      { encoding: 'utf-8' },
    ),
    test: {},
    libs: {
      'migration-tool-conductor': {
        templates: {
          'conductor-config.template.ejs': `{}`,
        },
      },
      'migration-tool-consul': {
        templates: {
          'consul-config.template.ejs': `{}`,
        },
      },
      'migration-tool-mongodb': {
        templates: {
          'mongodb-config.template.ejs': `{}`,
        },
      },
      'migration-tool-vault': {
        templates: {
          'vault-config.template.ejs': `{}`,
        },
      },
      'migration-tracking': {
        templates: {
          'reporting-config.template.ejs': `{}`,
        },
      },
    },
  };

  beforeAll(() => {
    vol.fromNestedJSON(mockFsData, ROOT);
  });

  beforeEach(async () => {
    mockLoggerService = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    } as any;
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [AppModule],
    })
      .overrideProvider(MigratorLoggerService)
      .useValue(mockLoggerService)
      .overrideProvider(FILESYSTEM_SERVICE_TOKEN)
      .useValue({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        readFile: async (path: string, _encoding: string) => {
          const f = await promisify(fs.readFile)(path);
          return f;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        writeFile: async (path: string, data: string, _encoding: string) => {
          await promisify(fs.writeFile)(path, data);
        },
        exists: async (path: string) => {
          return new Promise((resolve) => {
            fs.exists(path, (exists) => {
              resolve(exists);
            });
          });
        },
        mkdir: async (path: string) => {
          return promisify(fs.mkdir)(path);
        },
        readdir: async (path: string) => {
          return promisify(fs.readdir)(path);
        },
        unlink: async (path: string) => {
          return promisify(fs.unlink)(path);
        },
        rmdir: async (path: string) => {
          return promisify(fs.rmdir)(path);
        },
      })
      .compile();
  });

  it('should initialize a new project', async () => {
    await CommandTestFactory.run(commandInstance, ['init', '-o', 'test']);

    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'Initializing migration-tool project',
    );
    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'Adding conductor module',
    );
    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'Initializing conductor config',
    );
    expect(mockLoggerService.log).toHaveBeenCalledWith('Adding mongodb module');
    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'Initializing mongodb config',
    );
    expect(mockLoggerService.log).toHaveBeenCalledWith('Adding consul module');
    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'Initializing consul config',
    );
    expect(mockLoggerService.log).toHaveBeenCalledWith('Adding vault module');
    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'Initializing vault config',
    );
    expect(mockLoggerService.log).toHaveBeenCalledWith('Adding reporting');
    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'Initializing tracking config',
    );

    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'Config file created at: test/migration-tool.config.js',
    );

    const vJson = vol.toJSON();
    const newConfigStr = vJson[ROOT + '/test/migration-tool.config.js'];
    expect(newConfigStr).toBeDefined();
    const evaluated = eval(newConfigStr.replace('module.exports = ', ''));
    const newConfig = evaluated;
    expect(newConfig).toHaveProperty('conductor');
    expect(newConfig.conductor).toBeDefined();
    expect(newConfig.conductor.enabled).toBe(true);
    expect(newConfig.conductor.config).toBeDefined();
    expect(newConfig).toHaveProperty('mongodb');
    expect(newConfig.mongodb).toBeDefined();
    expect(newConfig.mongodb.enabled).toBe(true);
    expect(newConfig.mongodb.config).toBeDefined();
    expect(newConfig).toHaveProperty('consul');
    expect(newConfig.consul).toBeDefined();
    expect(newConfig.consul.enabled).toBe(true);
    expect(newConfig.consul.config).toBeDefined();
    expect(newConfig).toHaveProperty('vault');
    expect(newConfig.vault).toBeDefined();
    expect(newConfig.vault.enabled).toBe(true);
    expect(newConfig.vault.config).toBeDefined();
    expect(newConfig).toHaveProperty('reporting');
    expect(newConfig.reporting).toBeDefined();
    expect(newConfig.reporting.enabled).toBe(true);
    expect(newConfig.reporting.config).toBeDefined();
    console.log('************* GEN CONFIG *************');
    console.log(JSON.stringify(newConfig, null, 2));
    console.log('************************(*************');
  });

  afterAll(() => {
    vol.reset();
  });
});

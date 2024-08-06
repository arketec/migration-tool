import { TestingModule } from '@nestjs/testing';
import * as fsMock from 'mock-fs';
import { CommandTestFactory } from 'nest-commander-testing';
import { MigratorLoggerService } from '../src/logger/logger.service';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let commandInstance: TestingModule;
  let mockLoggerService: MigratorLoggerService;

  beforeAll(() => {
    fsMock({
      './templates/config.template.ejs': fsMock.load(
        'templates/config.template.ejs',
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
      },
    });
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

    expect(mockLoggerService.log).toHaveBeenCalledWith(
      'Config file created at: test/migration-tool.config.js',
    );
  });

  afterAll(() => {
    fsMock.restore();
  });
});

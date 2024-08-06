import { Test, TestingModule } from '@nestjs/testing';
import { MigratorLoggerService } from './logger.service';

describe('MigratorLoggerService', () => {
  let service: MigratorLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigratorLoggerService],
    }).compile();

    service = await module.resolve<MigratorLoggerService>(
      MigratorLoggerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log', () => {
    service.log('log');
  });
  it('should log with additional args', () => {
    service.log('log', 'additional');
  });

  it('should error', () => {
    service.error('error');
  });
  it('should error with additional args', () => {
    service.error('error', 'additional');
  });

  it('should warn', () => {
    service.warn('warn');
  });
  it('should warn with additional args', () => {
    service.warn('warn', 'additional');
  });

  it('should debug', () => {
    service.debug('debug');
  });
  it('should debug with additional args', () => {
    service.debug('debug', 'additional');
  });

  it('should verbose', () => {
    service.verbose('verbose');
  });
  it('should verbose with additional args', () => {
    service.verbose('verbose', 'additional');
  });

  it('should fatal', () => {
    service.fatal('fatal');
  });
  it('should fatal with additional args', () => {
    service.fatal('fatal', 'additional');
  });
});

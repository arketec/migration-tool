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
    service.log('test');
  });

  it('should error', () => {
    service.error('test');
  });

  it('should warn', () => {
    service.warn('test');
  });

  it('should debug', () => {
    service.debug('test');
  });

  it('should verbose', () => {
    service.verbose('test');
  });

  it('should fatal', () => {
    service.fatal('debug');
  });
});

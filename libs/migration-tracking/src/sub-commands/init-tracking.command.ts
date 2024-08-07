import { LoggerService } from '@nestjs/common';
import { IDefaultConfigurationInitializer } from '../../../migration-tool-common/src/IDefaultConfigurationInitializer';

export class InitTrackingDefaultConfigInitializer
  implements IDefaultConfigurationInitializer
{
  private readonly _DEFAULT_CONFIG: any;
  constructor(private readonly logService: LoggerService) {
    this._DEFAULT_CONFIG = {
      database: {
        connectionString: 'mongodb://localhost:27017',
        dbName: 'migration-tracking',
        collections: {
          conductor: 'conductor',
          consul: 'consul',
          mongodb: 'mongodb',
          vault: 'vault',
        },
      },
    };
  }

  async defaultConfig(): Promise<any> {
    this.logService.log('Initializing tracking config');
    this.logService.debug(
      `Default config: ${JSON.stringify(this._DEFAULT_CONFIG)}`,
    );
    return Promise.resolve(this._DEFAULT_CONFIG);
  }
}

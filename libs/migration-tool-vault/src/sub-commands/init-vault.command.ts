import { LoggerService } from '@nestjs/common';
import { IDefaultConfigurationInitializer } from '../../../migration-tool-common/src/IDefaultConfigurationInitializer';

export class InitVaultDefaultConfigInitializer
  implements IDefaultConfigurationInitializer
{
  private readonly _DEFAULT_CONFIG: any;
  constructor(private readonly logService: LoggerService) {}

  async defaultConfig(): Promise<any> {
    this.logService.log('Initializing vault config');
    this.logService.debug(
      `Default config: ${JSON.stringify(this._DEFAULT_CONFIG)}`,
    );
    return Promise.resolve(this._DEFAULT_CONFIG);
  }
}

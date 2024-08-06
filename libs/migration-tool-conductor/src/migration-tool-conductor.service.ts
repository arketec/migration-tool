import { Injectable } from '@nestjs/common';
import { IMigrationTool } from '../../migration-tool-common/src';

@Injectable()
export class MigrationToolConductorService implements IMigrationTool {
  create: () => Promise<void>;
  diff: () => Promise<void>;
  down: () => Promise<void>;
  help: () => Promise<void>;
  status: () => Promise<void>;
  up: () => Promise<void>;
  preInit?: () => Promise<void>;
  postInit?: () => Promise<void>;
  onInit: () => Promise<void>;
}

import { Command, CommandRunner, Option } from 'nest-commander';
import { join } from 'path';
import { IDefaultConfigurationInitializer } from '../../libs/migration-tool-common/src/IDefaultConfigurationInitializer';
import { InitConductorDefaultConfigInitializer } from '../../libs/migration-tool-conductor/src/sub-commands/init-conductor.command';
import { InitConsulDefaultConfigInitializer } from '../../libs/migration-tool-consul/src/sub-commands/init-consul.command';
import { InitMongoDbDefaultConfigInitializer } from '../../libs/migration-tool-mongodb/src/sub-commands/init-mongodb.command';
import { InitVaultDefaultConfigInitializer } from '../../libs/migration-tool-vault/src/sub-commands/init-vault.command';
import { FilesystemService } from '../filesystem/filesystem.service';
import { MigratorLoggerService } from '../logger/logger.service';
import { TemplatesService } from '../templates/templates.service';

const ROOT = join(__dirname, '..', '..');
interface InitOptions {
  excludes?: string[];
  force?: boolean;
  output?: string;
}

@Command({
  name: 'init',
  description:
    'Initialize migration-tool project by creating a config file and migration directories',
})
export class InitCommand extends CommandRunner {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly filesystemService: FilesystemService,
    private readonly logService: MigratorLoggerService,
  ) {
    super();
  }

  @Option({
    name: 'excludes',
    flags: '-e, --excludes <modules>',
    description: 'Modules to include in the config',
  })
  parseExcludes(value: string): string[] {
    return value.split(/[,:\s]+/);
  }
  @Option({
    name: 'force',
    flags: '-c, --force',
    description: 'Force overwrite of existing files',
  })
  parseForce(value: string): boolean {
    return !!value;
  }

  @Option({
    name: 'output',
    flags: '-o, --output <output>',
    description: 'Output directory',
  })
  parseOutput(value: string): string {
    return value;
  }

  async run(_: string[], options?: InitOptions): Promise<void> {
    const rootTemplates = `${ROOT}/templates`;

    const curDir = process.cwd();
    const supportedModules = {
      conductor: true,
      consul: true,
      mongodb: true,
      vault: true,
    };
    const templateConfig = {
      root: ROOT,
      views: [rootTemplates],
    };
    const props = {
      modules: [],
    };
    const initializers: Record<
      keyof typeof supportedModules,
      IDefaultConfigurationInitializer
    > = {
      conductor: new InitConductorDefaultConfigInitializer(this.logService),
      consul: new InitConsulDefaultConfigInitializer(this.logService),
      mongodb: new InitMongoDbDefaultConfigInitializer(this.logService),
      vault: new InitVaultDefaultConfigInitializer(this.logService),
    };

    this.logService.log('Initializing migration-tool project');
    await this.filesystemService.tryMkdir(`${curDir}/migrations`, (e) => {
      if (e.code !== 'EEXIST') {
        throw e;
      } else {
        this.logService.log('Migrations directory already exists');
      }
    });
    await Promise.all(
      Object.keys(supportedModules).map(async (module) => {
        if (!options?.excludes?.includes(module)) {
          this.logService.log(`Adding ${module} module`);
          templateConfig.views.push(
            `${ROOT}/libs/migration-tool-${module}/templates`,
          );
          const config = await initializers[module].defaultConfig();
          props.modules.push({
            name: module,
            defaultConfig: config,
          });
          await this.filesystemService.tryMkdir(
            `${curDir}/migrations/${module}`,
            (e) => {
              if (e.code !== 'EEXIST') {
                throw e;
              } else {
                this.logService.log(`${module} directory already exists`);
              }
            },
          );
        } else {
          this.logService.log(`Skipping ${module} module`);
        }
      }),
    );

    const renderedConfig = await this.templatesService.tryRenderFile(
      './templates/config.template.ejs',
      { props },
      templateConfig,
      (e) => {
        this.logService.error('Failed to render config file: ' + e.message);
        throw e;
      },
    );

    const outPath = `${options?.output ?? curDir}/migration-tool.config.js`;
    if (
      await this.filesystemService.tryWriteFile(
        outPath,
        renderedConfig,
        (e) => {
          if (e.code !== 'EEXIST') {
            this.logService.error('Failed to create config file: ' + e.message);
            throw e;
          } else {
            this.logService.log('Config file already exists');
          }
        },
      )
    ) {
      this.logService.log('Config file created at: ' + outPath);
    }
  }
}

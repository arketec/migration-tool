import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { MigratorLoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await CommandFactory.runWithoutClosing(AppModule);
  app.useLogger(app.get(MigratorLoggerService));
  await app.close();
}
bootstrap();

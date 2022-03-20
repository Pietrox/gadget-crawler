import { NestFactory } from '@nestjs/core';
import { CrawlerModule } from './crawler.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigLibModule } from '@app/config';
import { redisFactory } from '@app/factories';

async function bootstrap() {
  const configApp = await NestFactory.create(ConfigLibModule);
  const configService = await configApp.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CrawlerModule, redisFactory(configService) as MicroserviceOptions);

  await app.listen();
}
bootstrap();

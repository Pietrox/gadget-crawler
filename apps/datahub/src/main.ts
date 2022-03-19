import { NestFactory } from '@nestjs/core';
import { DatahubModule } from './datahub.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigLibModule } from '@app/config';

async function bootstrap() {
  const configApp = await NestFactory.create(ConfigLibModule);
  const configService = await configApp.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(DatahubModule, {
    transport: Transport.REDIS,
    options: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
      password: configService.get('REDIS_PASSWORD')
    },
  });

  await app.listen();
}
bootstrap();

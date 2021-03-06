import { BullModuleOptions } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { JobOptions } from 'bull';

export const bullFactory = (configService: ConfigService): BullModuleOptions => {
  return {
    redis: {
      host: configService.get('TRANSPORT_HOST'),
      port: configService.get('TRANSPORT_PORT'),
      password: configService.get('REDIS_PASSWORD'),
      connectTimeout: Number(configService.get('REDIS_TIMEOUT')),
      commandTimeout: Number(configService.get('REDIS_TIMEOUT')),
    },
  };
};

export const bullOptionsFactory = (): JobOptions => ({
  removeOnComplete: true,
  removeOnFail: false,
  attempts: 10,
  backoff: 1000,
  delay: 2000
});


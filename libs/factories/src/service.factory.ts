import { ConfigService } from '@nestjs/config';
import { ClientProvider } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { Transport } from '@nestjs/microservices';

export const redisFactory = (configService: ConfigService): ClientProvider => {
  return {
    transport: Transport.REDIS,
    options: {
      host: configService.get('TRANSPORT_HOST'),
      port: configService.get('TRANSPORT_PORT'),
      password: configService.get('REDIS_PASSWORD'),
      retryAttempts: 10,
      retryDelay: 100,
    },
  };
};

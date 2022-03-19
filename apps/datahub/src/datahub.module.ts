import { Module } from '@nestjs/common';
import { DatahubController } from './datahub.controller';
import { DatahubService } from './datahub.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '/app/.env',
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'REDIS_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            password: configService.get('REDIS_PASSWORD')
          },
        }),
      },
    ]),
  ],
  controllers: [DatahubController],
  providers: [DatahubService],
})
export class DatahubModule {}

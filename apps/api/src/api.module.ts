import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { BullModule } from '@nestjs/bull';
import { QueueEnum } from '@app/enums/queue.enum';
import { bullFactory, mongoFactory, redisFactory } from '@app/factories';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongoFactory,
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'REDIS_SERVICE',
        useFactory: redisFactory,
      },
    ]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: bullFactory,
    }),
    BullModule.registerQueue({ name: QueueEnum.crawlAsus }, { name: QueueEnum.crawlSamsung }, { name: QueueEnum.crawlLg }),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}

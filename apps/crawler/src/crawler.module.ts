import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { BullModule } from '@nestjs/bull';
import { bullFactory, mongoFactory, redisFactory } from '@app/factories';
import { QueueEnum } from '@app/enums';
import { AsusConsumer } from './consumers/asus.consumer';
import { CrawlerController } from './crawler.controller';
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
  controllers: [CrawlerController],
  providers: [CrawlerService, AsusConsumer],
})
export class CrawlerModule {}

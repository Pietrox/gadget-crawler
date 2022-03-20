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
import { AsusProducer } from './producers/asus.producer';
import { HttpModule } from '@nestjs/axios';
import { AsusPagesConsumer } from './consumers/asus.pages..consumer';
import { SamsungConsumer } from './consumers/samsung.consumer';
import { SamsungPagesConsumer } from './consumers/samsung.pages..consumer';
import { SamsungProducer } from './producers/samsung.producer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
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
    BullModule.registerQueue(
      { name: QueueEnum.crawlAsus },
      { name: QueueEnum.crawlSamsung },
      { name: QueueEnum.crawlLg },
      { name: QueueEnum.crawlAsusPages },
      { name: QueueEnum.crawlSamsungPages },
    ),
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService, AsusConsumer, AsusProducer, AsusPagesConsumer, SamsungConsumer, SamsungProducer, SamsungPagesConsumer],
})
export class CrawlerModule {}

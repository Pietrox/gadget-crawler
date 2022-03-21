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
import { LenovoConsumer } from './consumers/lenovo.consumer';
import { LenovoProducer } from './producers/lenovo.producer';
import { LenovoPagesConsumer } from './consumers/lenovo.pages..consumer';

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
      { name: QueueEnum.crawlLenovo },
      { name: QueueEnum.crawlAsusPages },
      { name: QueueEnum.crawlSamsungPages },
      { name: QueueEnum.crawlLenovoPages },
    ),
  ],
  controllers: [CrawlerController],
  providers: [
    CrawlerService,
    AsusConsumer,
    AsusProducer,
    AsusPagesConsumer,
    SamsungConsumer,
    SamsungProducer,
    SamsungPagesConsumer,
    LenovoConsumer,
    LenovoProducer,
    LenovoPagesConsumer,
  ],
})
export class CrawlerModule {}

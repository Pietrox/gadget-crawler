import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CommandEnum } from '@app/enums';
import { CrawlDto } from '../../../libs/dto/crawl.dto';
import { InjectQueue } from '@nestjs/bull';
import { QueueEnum } from '@app/enums/queue.enum';
import { Queue } from 'bull';
import { bullOptionsFactory } from '@app/factories';

@Injectable()
export class ApiService {
  constructor(
    @Inject('REDIS_SERVICE') private client: ClientProxy,
    @InjectQueue(QueueEnum.crawlAsus) private crawlAsus: Queue,
    @InjectQueue(QueueEnum.crawlSamsung) private crawlSamsung: Queue,
    @InjectQueue(QueueEnum.crawlLg) private crawlLg: Queue,
  ) {}

  getHealth(): boolean {
    return true;
  }

  async getCrawlerHealth(): Promise<Observable<boolean>> {
    try {
      return this.client.send({ cmd: CommandEnum.crawlerHealth }, {});
    } catch (error) {
      throw error;
    }
  }

  async getDatahubHealth(): Promise<Observable<boolean>> {
    return this.client.send({ cmd: CommandEnum.datahubHealth }, {});
  }

  async startCrawling(dto: CrawlDto): Promise<boolean> {
    await this.startCrawlingAsus();
    return true;
  }

  async startCrawlingAsus(): Promise<void> {
    try {

      await Promise.all(
        xml.map(async (link) => {
          await this.crawlAsus.add({ xml: link }, bullOptionsFactory());
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}

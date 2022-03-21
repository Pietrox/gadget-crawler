import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { CommandEnum } from '@app/enums';
import { InjectQueue } from '@nestjs/bull';
import { QueueEnum } from '@app/enums/queue.enum';
import { Queue } from 'bull';
import { bullOptionsFactory } from '@app/factories';
import { AsusConfigDocument } from '@app/schemas';
import { ConfigDto } from '@app/dto/config.dto';
import { SamsungConfigDocument } from '@app/schemas/samsung-config.schema';

@Injectable()
export class ApiService {
  constructor(
    @Inject('REDIS_SERVICE') private client: ClientProxy,
    @InjectQueue(QueueEnum.crawlAsus) private crawlAsus: Queue,
    @InjectQueue(QueueEnum.crawlSamsung) private crawlSamsung: Queue,
    @InjectQueue(QueueEnum.crawlLenovo) private crawlLenovo: Queue,
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

  async startCrawling(): Promise<boolean> {
    await this.startCrawlingAsus();
    await this.startCrawlingSamsung();
    await this.startCrawlingLenovo();
    return true;
  }

  async startCrawlingAsus(): Promise<void> {
    try {
      const config = await this.getAsusConfig();
      await this.crawlAsus.add(config, bullOptionsFactory());
    } catch (error) {
      throw error;
    }
  }

  async startCrawlingSamsung(): Promise<void> {
    try {
      const config = await this.getSamsungConfig();
      await this.crawlSamsung.add(config, bullOptionsFactory());
    } catch (error) {
      throw error;
    }
  }

  async startCrawlingLenovo(): Promise<void> {
    try {
      const config = await this.getLenovoConfig();
      await this.crawlLenovo.add(config, bullOptionsFactory());
    } catch (error) {
      throw error;
    }
  }

  async getAsusConfig(): Promise<ConfigDto> {
    const data = await firstValueFrom(this.client.send<AsusConfigDocument>({ cmd: CommandEnum.getAsusConfig }, {}));
    return ConfigDto.documentToDtofactory(data);
  }

  async getSamsungConfig(): Promise<ConfigDto> {
    const data = await firstValueFrom(this.client.send<SamsungConfigDocument>({ cmd: CommandEnum.getSamsungConfig }, {}));
    return ConfigDto.documentToDtofactory(data);
  }

  async getLenovoConfig(): Promise<ConfigDto> {
    const data = await firstValueFrom(this.client.send<SamsungConfigDocument>({ cmd: CommandEnum.getLenovoConfig }, {}));
    return ConfigDto.documentToDtofactory(data);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CommandEnum } from '@app/enums';

@Injectable()
export class ApiService {
  constructor(@Inject('REDIS_SERVICE') private client: ClientProxy) {}
  getHealth(): boolean {
    return true;
  }

  async getCrawlerHealth(): Promise<Observable<boolean>> {
    return this.client.send({ cmd: CommandEnum.crawlerHealth }, {});
  }

  async getDatahubHealth(): Promise<Observable<boolean>> {
    return this.client.send({ cmd: CommandEnum.datahubHealth }, {});
  }
}

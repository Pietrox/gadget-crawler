import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QueueEnum } from '@app/enums';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { ConfigDto } from '@app/dto/config.dto';
import { firstValueFrom } from 'rxjs';
import { XMLParser } from 'fast-xml-parser';
import { filter } from 'lodash';
import { bullOptionsFactory } from '@app/factories';

@Injectable()
export class AsusProducer {
  constructor(@InjectQueue(QueueEnum.crawlAsusPages) private crawlAsusPages: Queue, private httpService: HttpService) {}

  async produceSingleTasks(dto: ConfigDto): Promise<void> {
    const xml = await firstValueFrom(await this.httpService.get(dto.xml[0]));
    const parser = new XMLParser();
    const xmlData = parser.parse(xml.data);
    const links = filter(xmlData.urlset.url, (object) => {
      return object.loc.includes('techspec');
    });
    links.map(async (link) => {
      dto.url = link.loc;
      await this.crawlAsusPages.add({ ...dto }, bullOptionsFactory());
    });
  }
}

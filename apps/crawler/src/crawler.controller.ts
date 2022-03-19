import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import {MessagePattern} from "@nestjs/microservices";
import {CommandEnum} from "@app/enums";

@Controller()
export class CrawlerController {
  constructor(private readonly appService: CrawlerService) {}

  @Get()
  @MessagePattern({ cmd: CommandEnum.crawlerHealth })
  async getHello(): Promise<boolean> {
    return this.appService.getHealth();
  }
}

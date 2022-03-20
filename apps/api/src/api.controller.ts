import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CrawlDto } from '../../../libs/dto/crawl.dto';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('api-health')
  @ApiTags('Health')
  @ApiOperation({ description: 'Health check' })
  getApiHealth(): boolean {
    return this.apiService.getHealth();
  }

  @Get('crawler-health')
  @ApiTags('Health')
  @ApiOperation({ description: 'Crawler health' })
  async getCrawlerHealth(): Promise<Observable<boolean>> {
    return this.apiService.getCrawlerHealth();
  }

  @Get('datahub-health')
  @ApiTags('Health')
  @ApiOperation({ description: 'Datahub health' })
  async getDatahubhealth(): Promise<Observable<boolean>> {
    return this.apiService.getDatahubHealth();
  }

  @Post('gather-data')
  @ApiTags('Crawl')
  @ApiOperation({ description: 'Initiate crawling' })
  async startCrawling(@Body() dto: CrawlDto): Promise<boolean> {
    return this.apiService.startCrawling(dto);
  }
}

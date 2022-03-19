import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiOperation } from '@nestjs/swagger';
import {Observable} from "rxjs";

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('api-health')
  @ApiOperation({ description: 'Health check' })
  getApiHealth(): boolean {
    return this.apiService.getHealth();
  }

  @Get('crawler-health')
  @ApiOperation({description: 'Crawler health'})
  async getCrawlerHealth(): Promise<Observable<boolean>> {
    return this.apiService.getCrawlerHealth()
  }

  @Get('datahub-health')
  @ApiOperation({description: 'Datahub health'})
  async getDatahubhealth(): Promise<Observable<boolean>> {
    return this.apiService.getDatahubHealth()
  }
}

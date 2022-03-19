import { Controller, Get } from '@nestjs/common';
import { DatahubService } from './datahub.service';

@Controller()
export class DatahubController {
  constructor(private readonly datahubService: DatahubService) {}

  @Get()
  getHello(): string {
    return this.datahubService.getHello();
  }
}

import { Controller, Get } from '@nestjs/common';
import { DatahubService } from './datahub.service';
import {MessagePattern} from "@nestjs/microservices";
import {CommandEnum} from "@app/enums";

@Controller()
export class DatahubController {
    constructor(private readonly datahubService: DatahubService) {}

    @Get()
    @MessagePattern({ cmd: CommandEnum.datahubHealth })
    async getDatahubHealth(): Promise<boolean> {
        console.log('weszlo')
        return this.datahubService.getHealth();
    }
}

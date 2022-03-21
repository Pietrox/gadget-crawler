import { Controller } from '@nestjs/common';
import { DatahubService } from './datahub.service';
import {EventPattern, MessagePattern, Payload} from '@nestjs/microservices';
import { CommandEnum } from '@app/enums';
import { ConfigDto } from '@app/dto/config.dto';
import { AsusDocument } from '@app/schemas';
import {ExtProductDto, ProductDto} from '@app/dto/product.dto';

@Controller()
export class DatahubController {
  constructor(private readonly datahubService: DatahubService) {}

  @MessagePattern({ cmd: CommandEnum.datahubHealth })
  async getDatahubHealth(): Promise<boolean> {
    return this.datahubService.getHealth();
  }

  @MessagePattern({ cmd: CommandEnum.getAsusConfig })
  async getAsusConfig(): Promise<ConfigDto> {
    return this.datahubService.findAsusConfig();
  }

  @MessagePattern({ cmd: CommandEnum.getSamsungConfig })
  async getSamsungConfig(): Promise<ConfigDto> {
    return this.datahubService.findSamsungConfig();
  }

  @MessagePattern({ cmd: CommandEnum.getLenovoConfig })
  async getLenovoConfig(): Promise<ConfigDto> {
    return this.datahubService.findLenovoConfig();
  }

  @EventPattern(CommandEnum.insertAsusProduct)
  async insertAsusProduct(@Payload() data: ExtProductDto): Promise<AsusDocument> {
    console.log('asus')
    return this.datahubService.upsertAsusProduct(data);
  }

  @EventPattern(CommandEnum.insertSamsungProduct)
  async insertSamsungProduct(@Payload() data: ProductDto): Promise<AsusDocument> {
    console.log('samsung')
    return this.datahubService.upsertSamsungProduct(data);
  }

  @EventPattern(CommandEnum.insertLenovoProduct)
  async insertLenovoProduct(@Payload() data: ExtProductDto): Promise<AsusDocument> {
    console.log('lenovo')
    return this.datahubService.upsertLenovoProduct(data);
  }
}

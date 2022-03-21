import { Injectable } from '@nestjs/common';
import { ConfigRepository } from './repositories/config.repository';
import { ExtProductDto, ProductDto } from '@app/dto/product.dto';
import { AsusRepository } from './repositories/asus.repository';
import { AsusConfigDocument, AsusDocument } from '@app/schemas';
import { SamsungConfigDocument } from '@app/schemas/samsung-config.schema';
import { SamsungDocument } from '@app/schemas/samsung.schema';
import { SamsungRepository } from './repositories/samsung.repository';
import { LenovoRepository } from './repositories/lenovo.repository';
import {LenovoDocument} from "@app/schemas/lenovo.schema";
import {LenovoConfigDocument} from "@app/schemas/lenovo-config.schema";

@Injectable()
export class DatahubService {
  constructor(
    private readonly configRepository: ConfigRepository,
    private readonly asusRepository: AsusRepository,
    private readonly samsungRepository: SamsungRepository,
    private readonly lenovoRepository: LenovoRepository,
  ) {}
  getHealth(): boolean {
    return true;
  }

  findAsusConfig(): Promise<AsusConfigDocument> {
    return this.configRepository.findAsusConfig();
  }

  findSamsungConfig(): Promise<SamsungConfigDocument> {
    return this.configRepository.findSamsungConfig();
  }

  findLenovoConfig(): Promise<LenovoConfigDocument> {
    return this.configRepository.findLenovoConfig();
  }

  upsertAsusProduct(dto: ExtProductDto): Promise<AsusDocument> {
    return this.asusRepository.upsertByProductId(dto);
  }

  upsertSamsungProduct(dto: ProductDto): Promise<SamsungDocument> {
    return this.samsungRepository.upsertByProductId(dto);
  }

  upsertLenovoProduct(dto: ExtProductDto): Promise<LenovoDocument> {
    return this.lenovoRepository.upsertByProductId(dto);
  }
}

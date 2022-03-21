import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AsusConfigDocument } from '@app/schemas';
import { Model } from 'mongoose';
import { SamsungConfigDocument } from '@app/schemas/samsung-config.schema';
import { LenovoConfigDocument } from '@app/schemas/lenovo-config.schema';

@Injectable()
export class ConfigRepository {
  constructor(
    @InjectModel('asusConfig') private readonly asusConfigModel: Model<AsusConfigDocument>,
    @InjectModel('samsungConfig') private readonly samsungConfigModel: Model<SamsungConfigDocument>,
    @InjectModel('lenovoConfig') private readonly lenovoConfigModel: Model<LenovoConfigDocument>,
  ) {}

  async findAsusConfig(): Promise<AsusConfigDocument> {
    return this.asusConfigModel.findOne();
  }

  async findSamsungConfig(): Promise<SamsungConfigDocument> {
    return this.samsungConfigModel.findOne();
  }

  async findLenovoConfig(): Promise<LenovoConfigDocument> {
    return this.lenovoConfigModel.findOne();
  }
}

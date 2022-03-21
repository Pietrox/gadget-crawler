import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExtProductDto } from '@app/dto/product.dto';
import { LenovoDocument } from '@app/schemas/lenovo.schema';

@Injectable()
export class LenovoRepository {
  constructor(@InjectModel('lenovo') private readonly lenovoModel: Model<LenovoDocument>) {}

  async findAll(): Promise<LenovoDocument[]> {
    return this.lenovoModel.find();
  }

  async upsertByProductId(dto: ExtProductDto): Promise<LenovoDocument> {
    return this.lenovoModel.findOneAndUpdate({ productId: dto.productId }, { ...dto }, { upsert: true });
  }
}

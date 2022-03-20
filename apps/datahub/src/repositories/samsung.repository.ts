import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AsusDocument } from '@app/schemas';
import { Model } from 'mongoose';
import { ProductDto } from '@app/dto/product.dto';
import { SamsungDocument } from '@app/schemas/samsung.schema';

@Injectable()
export class SamsungRepository {
  constructor(@InjectModel('samsung') private readonly asusModel: Model<SamsungDocument>) {}

  async findAll(): Promise<SamsungDocument[]> {
    return this.asusModel.find();
  }

  async upsertByProductId(dto: ProductDto): Promise<AsusDocument> {
    return this.asusModel.findOneAndUpdate({ productId: dto.productId }, { ...dto }, { upsert: true });
  }
}

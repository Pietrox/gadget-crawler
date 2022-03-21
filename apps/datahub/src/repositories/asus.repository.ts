import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AsusDocument } from '@app/schemas';
import { Model } from 'mongoose';
import { ExtProductDto } from '@app/dto/product.dto';

@Injectable()
export class AsusRepository {
  constructor(@InjectModel('asus') private readonly asusModel: Model<AsusDocument>) {}

  async findAll(): Promise<AsusDocument[]> {
    return this.asusModel.find();
  }

  async upsertByProductId(dto: ExtProductDto): Promise<AsusDocument> {
    return this.asusModel.findOneAndUpdate({ productId: dto.productId }, { ...dto }, { upsert: true });
  }
}

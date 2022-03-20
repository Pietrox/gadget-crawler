import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductDto } from '@app/dto/product.dto';

export type SamsungDocument = SamsungModel & Document;

@Schema({ collection: 'asus', timestamps: true })
export class SamsungModel implements ProductDto {
  @Prop({ index: true, type: String, required: true })
  productId: string;
  @Prop()
  category: string;
  @Prop()
  type: string;
  @Prop()
  series: string;
  @Prop()
  model: string;
  @Prop()
  specs: string;
}

export const SamsungSchema = SchemaFactory.createForClass(SamsungModel);

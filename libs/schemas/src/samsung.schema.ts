import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductDto } from '@app/dto/product.dto';

export type SamsungDocument = SamsungModel & Document;

@Schema({ collection: 'samsung', timestamps: true })
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
  @Prop({ type: Object })
  specs: object;
}

export const SamsungSchema = SchemaFactory.createForClass(SamsungModel);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExtProductDto } from '@app/dto/product.dto';

export type LenovoDocument = LenovoModel & Document;

@Schema({ collection: 'lenovo', timestamps: true })
export class LenovoModel implements ExtProductDto {
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
  @Prop({type: Object})
  specs: object;
}

export const LenovoSchema = SchemaFactory.createForClass(LenovoModel);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExtProductDto } from '@app/dto/product.dto';

export type AsusDocument = AsusModel & Document;

@Schema({ collection: 'asus', timestamps: true })
export class AsusModel implements ExtProductDto {
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

export const AsusSchema = SchemaFactory.createForClass(AsusModel);

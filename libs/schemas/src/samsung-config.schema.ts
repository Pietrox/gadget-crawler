import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ConfigDto } from '@app/dto/config.dto';

export type SamsungConfigDocument = SamsungConfigModel & Document;

@Schema({ collection: 'samsungConfig', timestamps: true })
export class SamsungConfigModel implements ConfigDto {
  @Prop()
  url: string;

  @Prop()
  xml: string[];

  @Prop({ type: Object })
  utils?: object;
}

export const SamsungConfigSchema = SchemaFactory.createForClass(SamsungConfigModel);

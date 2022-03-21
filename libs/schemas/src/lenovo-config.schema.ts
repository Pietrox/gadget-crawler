import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ConfigDto } from '@app/dto/config.dto';

export type LenovoConfigDocument = LenovoConfigModel & Document;

@Schema({ collection: 'lenovoConfig', timestamps: true })
export class LenovoConfigModel implements ConfigDto {
  @Prop()
  url: string;

  @Prop()
  xml: string[];

  @Prop({ type: Object })
  utils?: object;
}

export const LenovoConfigSchema = SchemaFactory.createForClass(LenovoConfigModel);

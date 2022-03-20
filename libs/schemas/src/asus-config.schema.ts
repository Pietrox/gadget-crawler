import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ConfigDto } from '@app/dto/config.dto';

export type AsusConfigDocument = AsusConfigModel & Document;

@Schema({ collection: 'asusConfig', timestamps: true })
export class AsusConfigModel implements ConfigDto {
  @Prop()
  url: string;

  @Prop()
  xml: string[];

  @Prop({ type: Object })
  utils?: object;
}

export const AsusConfigSchema = SchemaFactory.createForClass(AsusConfigModel);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SpecResultInterface } from '@app/interfaces/spec-list.interface';

export type AsusDocument = AsusModel & Document;

@Schema()
export class AsusModel implements SpecResultInterface {
  @Prop()
  name: string;
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

export const AsusSchema = SchemaFactory.createForClass(AsusModel);

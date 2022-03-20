import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {UtilsInterface} from "@app/interfaces/utils.interface";

export type AsusConfigDocument = AsusConfigModel & Document

@Schema()
export class AsusConfigModel {
    @Prop()
    url: string

    @Prop()
    xml: string[]

    @Prop()
    utils?: UtilsInterface
}

export const AsusConfigSchema = SchemaFactory.createForClass(AsusConfigModel)
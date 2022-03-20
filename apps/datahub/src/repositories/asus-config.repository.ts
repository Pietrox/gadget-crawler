import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {AsusConfigDocument, AsusConfigModel} from "@app/schemas";
import { Model } from 'mongoose';

@Injectable()
export class AsusConfigRepository {
    constructor(
        @InjectModel('asusConfig') private readonly asusConfigModel: Model<AsusConfigDocument>
    ) {
    }

    async find(): Promise<AsusConfigModel> {
        return this.asusConfigModel.findOne()
    }
}
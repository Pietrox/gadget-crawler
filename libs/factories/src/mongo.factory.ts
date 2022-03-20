import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

export const mongoFactory = (configService: ConfigService): MongooseModuleOptions => {
  return {
    uri: configService.get('MONGODB_URL'),
  };
};

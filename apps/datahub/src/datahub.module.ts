import { Module } from '@nestjs/common';
import { DatahubService } from './datahub.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { mongoFactory, redisFactory } from '@app/factories';
import { DatahubController } from './datahub.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AsusConfigSchema, AsusSchema } from '@app/schemas';
import { ConfigRepository } from './repositories/config.repository';
import { AsusRepository } from './repositories/asus.repository';
import { SamsungConfigSchema } from '@app/schemas/samsung-config.schema';
import { SamsungSchema } from '@app/schemas/samsung.schema';
import { SamsungRepository } from './repositories/samsung.repository';
import { LenovoRepository } from './repositories/lenovo.repository';
import { LenovoConfigSchema } from '@app/schemas/lenovo-config.schema';
import { LenovoSchema } from '@app/schemas/lenovo.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongoFactory,
    }),
    MongooseModule.forFeature([
      { name: 'asusConfig', schema: AsusConfigSchema },
      { name: 'asus', schema: AsusSchema },
      { name: 'samsungConfig', schema: SamsungConfigSchema },
      { name: 'samsung', schema: SamsungSchema },
      { name: 'lenovoConfig', schema: LenovoConfigSchema },
      { name: 'lenovo', schema: LenovoSchema },
    ]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'REDIS_SERVICE',
        useFactory: redisFactory,
      },
    ]),
  ],
  controllers: [DatahubController],
  providers: [DatahubService, ConfigRepository, AsusRepository, SamsungRepository, LenovoRepository],
})
export class DatahubModule {}

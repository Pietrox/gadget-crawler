import { Module } from '@nestjs/common';
import { DatahubService } from './datahub.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import {mongoFactory, redisFactory} from '@app/factories';
import {DatahubController} from "./datahub.controller";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot(),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: mongoFactory
      }),
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
  providers: [DatahubService],
})
export class DatahubModule {}

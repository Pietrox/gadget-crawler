import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '/app/.env',
    }),
  ],
})
export class ConfigLibModule {}

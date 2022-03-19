import { NestFactory } from '@nestjs/core';
import { DatahubModule } from './datahub.module';

async function bootstrap() {
  const app = await NestFactory.create(DatahubModule);
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = await app.get<ConfigService>(ConfigService);

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
      password: configService.get('REDIS_PASSWORD')
    },
  });

  const swaggerOptions = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Below is a list of documented endpoints for api service')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/docs/', app, swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      ignoreGlobalPrefix: true,
      docExpansion: 'none',
      filter: true,
      displayRequestDuration: true,
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
    }),
  );
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

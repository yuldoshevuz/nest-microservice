import { NestFactory } from '@nestjs/core';
import { BooksAppModule } from './books-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BOOKS_CLIENT_PORT } from './books/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BooksAppModule, {
    transport: Transport.TCP,
    options: {
      port: BOOKS_CLIENT_PORT,
    }
  });

  app.listen();
}
bootstrap();

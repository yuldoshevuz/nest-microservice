import { NestFactory } from '@nestjs/core';
import { BookstoreApiGatewayModule } from './bookstore-api-gateway.module';
import { PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(BookstoreApiGatewayModule);
  await app.listen(PORT);
}

bootstrap();

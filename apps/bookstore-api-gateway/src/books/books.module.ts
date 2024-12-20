import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { ClientConfigModule } from '../client-config/client-config.module';
import { BOOKS_CLIENT } from './constants';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [ClientConfigModule],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: BOOKS_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.bookClientOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    },
  ],
})
export class BooksModule {}

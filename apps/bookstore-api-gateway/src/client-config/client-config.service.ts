import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class ClientConfigService {
  constructor(private config: ConfigService) {}

  getBooksClientPort(): number {
    return this.config.get<number>('BOOKS_CLIENT_PORT');
  }

  getUsersClientPort(): number {
    return this.config.get<number>('USERS_CLIENT_PORT');
  }

  get bookClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: this.getBooksClientPort(),
      },
    };
  }

  get userClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: this.getUsersClientPort(),
      },
    };
  }
}

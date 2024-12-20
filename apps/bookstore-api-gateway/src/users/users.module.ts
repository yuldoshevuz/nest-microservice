import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientConfigModule } from '../client-config/client-config.module';
import { USERS_CLIENT } from './contants';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [ClientConfigModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USERS_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.userClientOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService]
    }
  ]
})
export class UsersModule {}

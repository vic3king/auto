import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { WalletModule } from './wallet/wallet.module';
// import { OrderModule } from './order/order.module';

export class AppModule {
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: AppModule,
      controllers: [AppController],
      imports: [
        AuthModule,
        UsersModule,
        CarModule,
        WalletModule,
        // OrderModule,
        TypeOrmModule.forRoot(connOptions),
      ],
      providers: [AppService],
    };
  }
}

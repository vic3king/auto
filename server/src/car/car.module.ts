import { Module, forwardRef } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarEntity } from '../car/entity/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OrderModule } from 'src/order/order.module';
import { OrderEntity } from 'src/order/entity/order.entity';
import { WalletModule } from 'src/wallet/wallet.module';
import { WalletEntity } from 'src/wallet/entity/wallet.entity';

@Module({
    imports: [
      AuthModule,
      forwardRef(() => OrderModule),
      WalletModule,
      TypeOrmModule.forFeature([CarEntity, OrderEntity, WalletEntity]),
    ],
    controllers: [CarController],
    providers: [CarService],
})
export class CarModule {}

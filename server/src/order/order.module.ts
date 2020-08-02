import { Module, forwardRef } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './entity/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@user/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from '@user/users.module';
import { CarModule } from '@car/car.module';
import { CarEntity } from '@car/entity/car.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => CarModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([OrderEntity, UserEntity, CarEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

import { Module, forwardRef } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/order/order.module';
import { OrderEntity } from 'src/order/entity/order.entity';

@Module({
  imports: [
    forwardRef(() => OrderModule),
    TypeOrmModule.forFeature([UserEntity, OrderEntity]),
  ],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { OrderEntity } from './entity/order.entity';
import { OrderDto } from './dto/order.dto';
import { toOrderDto, toCarDto } from '@shared/mapper';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '@user/dto/user.dto';
import { UsersService } from '@user/users.service';
import { CarService } from '@car/car.service';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    // private readonly carService: CarService,
    // private readonly walletService: WalletService,
    private readonly usersService: UsersService,
  ) {}

  async getOneOrder(id: string): Promise<OrderEntity> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['owner', 'car'],
    });

    if (!order) {
      throw new HttpException(`order doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toOrderDto(order);
  }

  async createOrder({ username }: UserDto, id: string): Promise<OrderDto> {
    // get the user from db
    const owner = await this.usersService.findOne({ where: { username } });

    // const car = await this.carService.getOneCar(id);

    const order: OrderEntity = await this.orderRepo.create({
      owner,
      // car,
    });

    await this.orderRepo.save(order);

    return toOrderDto(order);
  }
}

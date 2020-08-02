import { UserEntity } from '@user/entity/user.entity';
import { UserDto } from '@user/dto/user.dto';

import { CarEntity } from '../car/entity/car.entity';
import { CarDto } from '../car/dto/car.dto';
import { WalletEntity } from '../wallet/entity/wallet.entity';
import { WalletDto } from '../wallet/dto/wallet.dto';
import { OrderEntity } from 'src/order/entity/order.entity';
import { OrderDto } from 'src/order/dto/order.dto';

export const toCarDto = (data: CarEntity): CarDto => {
  const { id, make, model, features, vin, price, location } = data;

  let carDto: CarDto = {
    id,
    make,
    model,
    features,
    vin,
    price,
    location,
  };

  return carDto;
};

export const toWalletDto = (data: WalletEntity): WalletDto => {
  const { id, balance, createdOn, owner } = data;

  let walletDto: WalletDto = {
    id,
    balance,
    createdOn,
    owner: owner ? toUserDto(owner) : null,
  };

  return walletDto;
};

export const toOrderDto = (data: OrderEntity): OrderDto => {
  const { id, car, owner, createdOn, updatedOn, isPurchased } = data;

  let orderDto: OrderDto = {
    id,
    createdOn,
    updatedOn,
    car,
    owner,
    isPurchased,
  };

  return orderDto;
};

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;

  let userDto: UserDto = {
    id,
    username,
    email,
  };

  return userDto;
};

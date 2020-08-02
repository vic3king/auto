import { IsNotEmpty } from 'class-validator';
import { CarDto } from '@car/dto/car.dto';
import { UserDto } from '@user/dto/user.dto';
import { UserEntity } from '@user/entity/user.entity';
import { CarEntity } from '@car/entity/car.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  car: CarEntity;

  @IsNotEmpty()
  owner: UserEntity;

  createdOn?: Date;
  updatedOn?: Date;
  isPurchased?: Boolean;
}

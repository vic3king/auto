import { IsNotEmpty } from 'class-validator';
import { UserDto } from '@user/dto/user.dto';
import { CarDto } from '@car/dto/car.dto';
import { UserEntity } from '@user/entity/user.entity';
import { CarEntity } from '@car/entity/car.entity';

export class OrderDto {
  @IsNotEmpty()
  id: string;

  car: CarEntity;

  owner: UserEntity;

  createdOn?: Date;
  updatedOn?: Date;
  isPurchased?: Boolean;
}

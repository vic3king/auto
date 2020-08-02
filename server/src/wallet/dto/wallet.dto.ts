import { IsNotEmpty } from 'class-validator';
import { UserDto } from '@user/dto/user.dto';

export class WalletDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  balance: number;

  createdOn?: Date;

  owner: UserDto;
}

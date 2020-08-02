import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { WalletEntity } from './entity/wallet.entity';
import { WalletDto } from './dto/wallet.dto';
import { toWalletDto } from '@shared/mapper';
import { CreateWalletDto } from './dto/wallet.create.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '@user/dto/user.dto';
import { UsersService } from '@user/users.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepo: Repository<WalletEntity>,
    private readonly usersService: UsersService,
  ) {}

  async getOneWallet(id: string): Promise<WalletDto> {
    const wallet = await this.walletRepo.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!wallet) {
      throw new HttpException(`wallet doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toWalletDto(wallet);
  }

  async createWallet(
    { username }: UserDto,
    createWalletDto: CreateWalletDto,
  ): Promise<WalletDto> {
    const { amount } = createWalletDto;

    // get the user from db
    const owner = await this.usersService.findOne({ where: { username } });

    const wallet: WalletEntity = await this.walletRepo.create({
      balance: amount,
      owner,
    });

    await this.walletRepo.save(wallet);

    return toWalletDto(wallet);
  }

  async updateWallet(id: string, walletDto: WalletDto): Promise<WalletDto> {
    const { balance } = walletDto;

    let wallet: WalletEntity = await this.walletRepo.findOne({ where: { id } });

    if (!wallet) {
      throw new HttpException(
        `wallet list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    wallet = {
      id,
      balance: wallet.balance + balance,
    };

    await this.walletRepo.update({ id }, wallet); // update

    wallet = await this.walletRepo.findOne({
      where: { id },
      relations: ['owner'],
    }); // re-query

    return toWalletDto(wallet);
  }
}

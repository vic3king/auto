import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';

import { WalletDto } from './dto/wallet.dto';
import { CreateWalletDto } from './dto/wallet.create.dto';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@user/dto/user.dto';

@Controller('api/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WalletDto> {
    return await this.walletService.getOneWallet(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createWalletDto: CreateWalletDto,
    @Req() req: any,
  ): Promise<WalletDto> {
    const user = req.user as UserDto;

    return await this.walletService.createWallet(user, createWalletDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() walletDto: WalletDto,
  ): Promise<WalletDto> {
    return await this.walletService.updateWallet(id, walletDto);
  }
}

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

import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@user/dto/user.dto';
@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderDto> {
    return await this.orderService.getOneOrder(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() carId: string,
    @Req() req: any,
  ): Promise<OrderDto> {
    const user = req.user as UserDto;

    return await this.orderService.createOrder(user, carId);
  }

  // @Put(':id')
  // @UseGuards(AuthGuard())
  // async update(
  //   @Param('id') id: string,
  //   @Body() orderDto: OrderDto,
  // ): Promise<OrderDto> {
  //   return await this.orderService.updateWallet(id, CarDto);
  // }
}

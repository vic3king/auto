import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CarListDto } from '../car/dto/car.list.dto';
import { CarDto } from '../car/dto/car.dto';
import { CreateCarDto } from '../car/dto/car.create.dto';
import { CarService } from './car.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async findAll(@Req() req: any): Promise<CarListDto> {
    const cars = await this.carService.getAllCar();
    return { cars };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CarDto> {
    return await this.carService.getOneCar(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createCarDto: CreateCarDto,
    @Req() req: any,
  ): Promise<CarDto> {
    return await this.carService.createCar(createCarDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() carDto: CarDto,
  ): Promise<CarDto> {
    return await this.carService.updateCar(id, carDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async destory(@Param('id') id: string): Promise<CarDto> {
    return await this.carService.destroyCar(id);
  }
}

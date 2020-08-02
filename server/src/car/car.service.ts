import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { CarEntity } from '../car/entity/car.entity';

import { CarDto } from '../car/dto/car.dto';
import { toCarDto } from '@shared/mapper';

import { CreateCarDto } from '../car/dto/car.create.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepo: Repository<CarEntity>,
  ) {}

  async getAllCar(): Promise<CarDto[]> {
    const cars = await this.carRepo.find({});
    return cars.map(car => toCarDto(car));
  }

  async getOneCar(id: string): Promise<CarDto> {
    const car = await this.carRepo.findOne({
      where: { id },
    });

    if (!car) {
      throw new HttpException(`Car doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toCarDto(car);
  }

  async createCar(createCarDto: CreateCarDto): Promise<CarDto> {
    const { make, model, features, vin, price, location } = createCarDto;

    const car: CarEntity = await this.carRepo.create({
      make,
      model,
      features,
      vin,
      price,
      location,
    });

    await this.carRepo.save(car);

    return toCarDto(car);
  }

  async updateCar(id: string, CarDto: CarDto): Promise<CarDto> {
    const { make, model, features, vin, price, location } = CarDto;

    let car: CarEntity = await this.carRepo.findOne({ where: { id } });

    if (!car) {
      throw new HttpException(
        `Car doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    car = {
      id,
      make,
      model,
      features,
      vin,
      price,
      location,
    };

    await this.carRepo.update({ id }, car); // update

    car = await this.carRepo.findOne({
      where: { id },
    }); // re-query

    return toCarDto(car);
  }

  async destroyCar(id: string): Promise<CarDto> {
    const car: CarEntity = await this.carRepo.findOne({
      where: { id },
    });

    if (!car) {
      throw new HttpException(`Car doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.carRepo.delete({ id });

    return toCarDto(car);
  }
}

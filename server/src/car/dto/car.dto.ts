import { IsNotEmpty } from 'class-validator';

export class CarDto {
  id: string;
  make: string;
  model: string;
  vin: string;
  price: number;
  location: string;
  features?: string; // could be an array...
  createdOn?: Date;
  updatedOn?: Date;
}

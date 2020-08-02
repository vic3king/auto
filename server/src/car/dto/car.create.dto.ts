import { IsNotEmpty, MaxLength } from 'class-validator';
export class CreateCarDto {
  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  vin: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  location: string;

  features?: string; // could be an array...
}

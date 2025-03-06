import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHealthDataDto {
  @IsNumber()
  @IsNotEmpty()
  heightFeet: number;

  @IsNumber()
  @IsNotEmpty()
  heightInches: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

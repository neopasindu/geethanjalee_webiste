import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  passId: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  phone: string;

  @IsEmail()
  email: string;
}

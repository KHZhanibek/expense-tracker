import { Decimal } from '@prisma/client/runtime';
import { IsNotEmpty, IsString, IsNumber, ValidateNested } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: Decimal;

  @IsNumber()
  categoryId: number;
}
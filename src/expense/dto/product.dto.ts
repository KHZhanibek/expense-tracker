import { IsNotEmpty, IsString, IsNumber, ValidateNested } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber()
  categoryId: number;
}
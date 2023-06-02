import { IsNotEmpty, IsString, IsNumber, ValidateNested, IsOptional, IsDecimal } from 'class-validator';

export class UpdateProductDto {
  
  @IsString()
  @IsOptional()
  name: string;

  @IsDecimal()
  @IsOptional()
  price: number;

}
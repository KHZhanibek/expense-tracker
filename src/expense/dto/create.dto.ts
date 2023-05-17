import { IsNotEmpty, IsString, IsNumber, ValidateNested } from 'class-validator';
import { ProductDto } from './product.dto';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;


  @ValidateNested({ each: true })
  products: ProductDto[];
}
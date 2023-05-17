import { IsNotEmpty, IsString, IsNumber, ValidateNested } from 'class-validator';
import { ProductDto } from './product.dto';

export class UpdateDto {
  
  @IsString()
  title: string;

  @IsString()
  description: string;

  @ValidateNested({ each: true })
  products: ProductDto[];

  @IsNumber()
  categoryId: number;

  @IsNumber()
  walletId: number;

}
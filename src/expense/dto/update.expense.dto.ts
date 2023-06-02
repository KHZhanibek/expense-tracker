import { IsNotEmpty, IsString, IsNumber, ValidateNested, IsOptional } from 'class-validator';

export class UpdateExpenseDto {
  
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;


  @IsNumber()
  @IsOptional()
  categoryId: number;

  @IsNumber()
  @IsOptional()
  walletId: number;

}
import { IsNotEmpty, IsString, IsNumber, ValidateNested, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ExpenseType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export class CreateExpenseDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  type: ExpenseType;

  @IsString()
  @IsOptional()
  description: string;

}
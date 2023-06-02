import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsNumber, IsOptional } from "class-validator";

export class UpdateWalletDto{

  @ApiProperty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  balance: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  ownerId: number;
}
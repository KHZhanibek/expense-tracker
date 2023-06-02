import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsNumber } from "class-validator";

export class CreateWalletDto{

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}
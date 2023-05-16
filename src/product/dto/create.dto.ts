import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDto{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
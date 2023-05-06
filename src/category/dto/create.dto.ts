import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsNumber } from "class-validator";

export class CreateDto{
  @IsEmail()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

}
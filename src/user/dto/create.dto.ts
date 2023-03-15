import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from "class-validator";

export class CreateDto{
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsPhoneNumber('KZ')
  @IsNotEmpty()
  phone: string;
}
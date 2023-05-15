import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateDto{
  @IsEmail()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

}
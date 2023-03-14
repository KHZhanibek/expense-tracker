import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

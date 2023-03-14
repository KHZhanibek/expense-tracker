import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class RegisterDto {

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

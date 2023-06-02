import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginPhoneDto {
  
  @ApiProperty()
  @IsPhoneNumber('KZ')
  @IsNotEmpty()
  phone: string;
}

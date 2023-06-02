import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsPhoneNumber, IsOptional } from "class-validator";

export class UpdateUserDto{

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastname: string;

  @ApiProperty()
  @IsPhoneNumber('KZ')
  @IsOptional()
  phone: string;
}
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  testAuth(){
    return "Hello, I am in auth route!";
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

}

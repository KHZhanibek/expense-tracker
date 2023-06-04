import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginEmailDto, RegisterDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Test auth route'})
  @Get()
  testAuth(){
    return "Hello, I am in auth route!";
  }

  @ApiOperation({summary: 'Register user'})
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({summary: 'Login user'})
  @Post('login/with-email')
  login(@Body() dto: LoginEmailDto) {
    return this.authService.loginByEmail(dto);
  }

  @ApiOperation({summary: 'Confirm user'})
  @Get('confirm')
  confirm(@Query("token") token: string) {
    console.log(token)
    return this.authService.confirm(token);
  }

  // @ApiOperation({summary: 'Login user'})
  // @Post('login/with-phone')
  // loginWithPhone(@Body() dto: LoginPhoneDto) {
  //   return this.authService.loginWithPhone(dto);
  // }

}


import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService){}
  
  @Get()
  getAllUsers(){
      return this.userService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) userId: number){
      return this.userService.getUser(userId);
  }

  @Post()
  createUser(@Body() userDto: CreateDto){
      console.log(userDto.email)
      return this.userService.createUser(userDto);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) userId: number, @Body() userDto: CreateDto){
      return this.userService.updateUser(userId, userDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) userId: number){
      return this.userService.deleteUser(userId);
  }

  
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateExpenseDto } from 'src/expense/dto/create.expense.dto';

@ApiTags('users')
@Controller('users')
export class UserController {

  constructor(private userService: UserService){}
  
  @ApiBearerAuth()
  @ApiOperation({summary: 'Get all users'})
  @UseGuards(AuthGuard)
  @Get()
  getAllUsers(){
    return this.userService.getAllUsers();
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get user by id'})
  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) userId: number){
    return this.userService.getUser(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Create user'})
  @UseGuards(AuthGuard)
  @Post()
  createUser(@Body() userDto: CreateUserDto){
    console.log(userDto.email)
    return this.userService.createUser(userDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Update user'})
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) userId: number, @Body() userDto: UpdateUserDto){
    return this.userService.updateUser(userId, userDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete user'})
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) userId: number){
    return this.userService.deleteUser(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get wallets of user'})
  @UseGuards(AuthGuard)
  @Get(':id/wallets')
  async getWalletsOfUser(@Param('id', ParseIntPipe) userId: number){
    return this.userService.getWalletsOfUser(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Add wallet to user'})
  @UseGuards(AuthGuard)
  @Get(':id/wallets/:walletId')
  async addWalletToUser(@Param('id', ParseIntPipe) userId: number, @Param('walletId', ParseIntPipe) walletId: number){
    return this.userService.addWalletToUser(userId, walletId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Remove wallet from user'})
  @UseGuards(AuthGuard)
  @Get(':id/wallets/:walletId')
  async removeWalletFromUser(@Param('id', ParseIntPipe) userId: number, @Param('walletId', ParseIntPipe) walletId: number){
    return this.userService.removeWalletFromUser(userId, walletId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get expenses of user'})
  @UseGuards(AuthGuard)
  @Get(':id/expenses')
  async getExpensesOfUser(@Param('id', ParseIntPipe) userId: number){
    return this.userService.getExpensesOfUser(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Create expense in wallet'})
  @UseGuards(AuthGuard)
  @Post(':id/wallets/:walletId/expenses')
  async createExpenseOfWallet(
    @Param('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) walletId: number, 
    @Body() createExpenseDto: CreateExpenseDto
    ){
        return this.userService.createExpenseOfWallet(userId, walletId, createExpenseDto);

  }
 
}


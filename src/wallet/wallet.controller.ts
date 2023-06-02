import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateWalletDto } from './dto/create.wallet.dto';
import { UpdateWalletDto } from './dto/update.wallet.dto';
import { create } from 'domain';
import { CreateExpenseDto } from './dto/create.expense.dto';

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService){}
  
  @ApiBearerAuth()
  @ApiOperation({summary: 'Get all wallets'})
  @UseGuards(AuthGuard)
  @Get()
  async getAllWallets(){
    return this.walletService.getAllWallets();
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get wallet by id'})
  @UseGuards(AuthGuard)
  @Get(':id')
  async getWallet(@Param('id', ParseIntPipe) walletId: number){
    return this.walletService.getWallet(walletId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Create wallet'})
  @UseGuards(AuthGuard)
  @Post()
  async createWallet(@Body() walletDto: CreateWalletDto){
    return this.walletService.createWallet(walletDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Update wallet'})
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateWallet(@Param('id', ParseIntPipe) walletId: number, @Body() walletDto: UpdateWalletDto){
    return this.walletService.updateWallet(walletId, walletDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete wallet'})
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteWallet(@Param('id', ParseIntPipe) walletId: number){
    return this.walletService.deleteWallet(walletId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get users of wallet'})
  @UseGuards(AuthGuard)
  @Get(':id/users')
  async getUsersUsingWallet(@Param('id', ParseIntPipe) walletId: number){
    return this.walletService.getUsersOfWallet(walletId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Add user to wallet'})
  @UseGuards(AuthGuard)
  @Get(':id/addUser/:userId')
  async addUserToWallet(@Param('id', ParseIntPipe) walletId: number, @Param('userId', ParseIntPipe) userId: number){
    return this.walletService.addUserToWallet(walletId, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Remove user from wallet'})
  @UseGuards(AuthGuard)
  @Get(':id/removeUser/:userId')
  async removeUserFromWallet(@Param('id', ParseIntPipe) walletId: number, @Param('userId', ParseIntPipe) userId: number){
    return this.walletService.removeUserFromWallet(walletId, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get expenses of wallet'})
  @UseGuards(AuthGuard)
  @Get(':id/expenses')
  async getExpensesOfWallet(@Param('id', ParseIntPipe) walletId: number){
    return this.walletService.getExpensesOfWallet(walletId);
  }

  
}

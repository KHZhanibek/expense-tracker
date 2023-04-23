import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { WalletService } from './wallet.service';

@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService){}
  
  @Get()
  async getAllWallets(){
    return this.walletService.getAllWallets();
  }

  @Get(':id')
  async getWallet(@Param('id', ParseIntPipe) walletId: number){
    return this.walletService.getWallet(walletId);
  }

  @Post()
  async createWallet(@Body() walletDto: CreateDto){
    return this.walletService.createWallet(walletDto);
  }

  @Put(':id')
  async updateWallet(@Param('id', ParseIntPipe) walletId: number, @Body() walletDto: CreateDto){
    return this.walletService.updateWallet(walletId, walletDto);
  }

  @Delete(':id')
  async deleteWallet(@Param('id', ParseIntPipe) walletId: number){
    return this.walletService.deleteWallet(walletId);
  }
  
}

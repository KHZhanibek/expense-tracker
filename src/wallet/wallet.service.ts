import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class WalletService {
  constructor(private prismaService: PrismaService){}
    
  async getAllWallets(){
    return await this.prismaService.wallet.findMany({
      select: {
        title: true,
        description: true,
        balance: true
      }
    });
  }

  async getWallet(walletId: number){
    return await this.prismaService.wallet.findFirst({
      where:{
        id: walletId
      }
    })
  }

  async createWallet(walletDto: CreateDto){
    const newWallet = await this.prismaService.wallet.create({
      data:{
        title: walletDto.title,
        description: walletDto.description,
        balance: walletDto.balance
      }
    });

    return {
      message: `Successfully created wallet`,
      wallet: newWallet
    };
  }

  async updateWallet(walletId: number, walletDto: CreateDto){
    const newWallet = await this.prismaService.wallet.update({
      where:{
        id: walletId
      },
      data:{
        title: walletDto.title,
        description: walletDto.description,
        balance: walletDto.balance
      }
    });
    return {
      message: `Successfully updated wallet with id: ${walletId}`,
      wallet: newWallet
    }
  }

  async deleteWallet(walletId: number){
    await this.prismaService.wallet.delete({
      where:{
        id: walletId
      }
    })
    return {message: `Successfully deleted wallet with id: ${walletId}`};
  }
  

  
  

}

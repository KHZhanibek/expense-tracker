import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
  

}

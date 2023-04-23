import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class WalletService {
  constructor(private prismaService: PrismaService){}
    
  async walletExists(walletId: number){
    const countWallet = await this.prismaService.wallet.count({
      where:{
        id: walletId
      }
    })
    if(countWallet == 0)
      return false;
    return true;
  }

  async userExists(userId: number){
    const countUser = await this.prismaService.user.count({
      where:{
        id: userId
      }
    })
    if(countUser == 0)
      return false;
    return true;
  }

  async getAllWallets(){
    return await this.prismaService.wallet.findMany({
    });
  }

  async getWallet(walletId: number){
    if(!this.walletExists(walletId))
      return {message: `Wallet with id: ${walletId} does not exists`}
    
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
  
  //Wallet-Users

  async getUsersUsingWallet(walletId: number){
    return await this.prismaService.wallet.findMany({
      include:{
        users: {
          include:{
            user:true
          }
        }
      },
      where:{
        id: walletId
      }
    })
  }

  async addUserToWallet(walletId: number, userId: number){
    if(!this.walletExists(walletId))
      return {message: `Wallet with id: ${walletId} does not exists`}
      if(!this.userExists(userId))
      return {message: `Wallet with id: ${walletId} does not exists`}
    
    return await this.prismaService.userOnWallet.create({
      data:{
        user_id: userId,
        wallet_id: walletId
      }
    })
  }

  // async removeUserFromWallet(walletId: number, userId: number){
  //   if(!this.walletExists(walletId))
  //     return {message: `Wallet with id: ${walletId} does not exists`}
  //   if(!this.userExists(userId))
  //     return {message: `User with id: ${userId} does not exists`}
    
  //   await this.prismaService.userOnWallet.delete({
  //     where:{
  //       user_id: 
  //     },
  //     include:{
  //       user: true,
  //       wallet: true
        
  //     }
  //   })
    
  //   await this.prismaService.wallet.update({
  //     where:{
  //       id: walletId
  //     },
  //     data:{
  //       users: {
  //         disconnect: {
  //           id: userId
  //         }
  //       }
  //     }
  //   })
  // }
  async removeUserFromWallet(walletId: number, userId: number){
    if(!this.walletExists(walletId))
      return {message: `Wallet with id: ${walletId} does not exist`}
    if(!this.userExists(userId))
      return {message: `User with id: ${userId} does not exist`}

    const userOnWallet = await this.prismaService.userOnWallet.findFirst({
        where: {
            user_id: userId,
            wallet_id: walletId,
        },
    });
  
    if (!userOnWallet) {
      return { message: `User with id ${userId} is not associated with wallet with id ${walletId}` };
    }
  
    await this.prismaService.userOnWallet.delete({
      where: {
        id: userOnWallet.id,
      },
    });
  
    return { message: `User with id ${userId} has been removed from wallet with id ${walletId}` };
  }
  }
}

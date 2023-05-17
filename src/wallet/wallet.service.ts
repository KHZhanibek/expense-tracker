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
    console.log(countWallet);
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
    return await this.prismaService.wallet.findMany();
  }

  async getWallet(walletId: number){

    if(! (await this.walletExists(walletId)))
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
        balance: walletDto.balance,
        ownerId: walletDto.ownerId
      }
    });

    return {
      message: `Successfully created wallet`,
      wallet: newWallet
    };
  }

  async updateWallet(walletId: number, walletDto: CreateDto){
    if(! (await this.walletExists(walletId)))
      return {message: `Wallet with id: ${walletId} does not exists`}
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
    console.log(await this.walletExists(walletId))

    if(! (await this.walletExists(walletId)))
      return {message: `Wallet with id: ${walletId} does not exists`}

    await this.prismaService.userOnWallet.deleteMany({
      where:{
        wallet_id: walletId
      }
    })
    await this.prismaService.wallet.delete({
      where:{
        id: walletId
      }
    })
    return {message: `Successfully deleted wallet with id: ${walletId}`};
  }
  
  //Wallet-Users

  async getUsersOfWallet(walletId: number) {
    if (await this.walletExists(walletId) == false) {
      return { message: `Wallet with id: ${walletId} does not exist` };
    }
  
    const users = await this.prismaService.user.findMany({
      where: {
        wallets: {
          some: {
            wallet_id: walletId,
          },
        },
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        phone: true,
      },
    });
  
    return { 
        message: `Successfully getting users`,
        users: users 
    };
  }

  async addUserToWallet(walletId: number, userId: number){
    if(!(await this.walletExists(walletId)))
      return {message: `Wallet with id: ${walletId} does not exist`}
      
    if(!this.userExists(userId))
      return {message: `User with id: ${userId} does not exist`}
  
    try {
      const newUserOnWallet = await this.prismaService.userOnWallet.create({
        data:{
          user_id: userId,
          wallet_id: walletId
        }
      });
      
      return { message: `User with id ${userId} has been added to wallet with id ${walletId}` };
    } catch (error) {
      return { message: `Failed to add user with id ${userId} to wallet with id ${walletId}: ${error.message}` };
    }
  }

  async removeUserFromWallet(walletId: number, userId: number){
    if(!(await this.walletExists(walletId)))
      return {message: `Wallet with id: ${walletId} does not exist`}
    if(!(await this.userExists(userId)))
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

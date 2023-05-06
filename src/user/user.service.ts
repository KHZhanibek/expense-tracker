import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create.dto';
import * as bcrypt from 'bcrypt'
import { prisma } from '@prisma/client';

@Injectable()
export class UserService {
    
  constructor(private prismaService: PrismaService){}

  async encryptPassword(password: string){
    const saltRounds: number = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const salt = bcrypt.genSaltSync(saltRounds)
    const encryptedPassword: string = await bcrypt.hash(password, salt)
    return encryptedPassword;
  }

  async getAllUsers(){
    return await this.prismaService.user.findMany({
      select:{
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        phone: true
      }
    });
  }

  async getUser(userId: number){
    const user = await this.prismaService.user.findFirst({
      select:{
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        phone: true
      },
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(userDto: CreateDto){
    const user = await this.prismaService.user.findUnique({
      where: { 
        email: userDto.email 
      }
    });
    if (user) {
      throw new ForbiddenException('Email already in use');
    }

    let encryptedPassword: string = await this.encryptPassword(userDto.password)

    const newUser = await this.prismaService.user.create({
      data: {
        email: userDto.email,
        password: encryptedPassword,
        firstname: userDto.firstname,
        lastname: userDto.lastname,
        phone: userDto.phone
      }
    });
    return {
      message: `Successfully created user`,
      user: newUser
    };
  }

  async updateUser(userId: number, userDto: CreateDto) {
    this.doesUserExists(userId)

    let encryptedPassword:string = await this.encryptPassword(userDto.password)
    
    const newUser = await this.prismaService.user.update({
      where: {
        id: userId
      },
      data: {
        email: userDto.email,
        password: encryptedPassword,
        firstname: userDto.firstname,
        lastname: userDto.lastname,
        phone: userDto.phone
      }
    });
    return {
      message: `Successfully updated user with id: ${userId}`,
      user: newUser
    };
  }

  async deleteUser(userId: number){
    this.doesUserExists(userId)
    await this.prismaService.user.delete({
      where: {
        id: userId
      }
    })
    return {message: `Successfully deleted user with id: ${userId}`};
  }


  async doesUserExists(userId: number){
    if(await this.prismaService.user.count({
      where:{
        id: userId
      }
    }) == 0){
      throw new ForbiddenException(`User with id ${userId} does not exists`);
    }
  }

  // getWalletsOfUser
  async getWalletsOfUser(userId: number){
    this.doesUserExists(userId)
    return await this.prismaService.user.findFirst({
      where:{
        id: userId
      },
      select:{
        wallets: true
      }
    })
  }

  // addWalletToUser
  async addWalletToUser(userId: number, walletId: number){
    this.doesUserExists(userId)
    if(await this.prismaService.wallet.count({
      where:{
        id: walletId
      }
    }) == 0){
      throw new ForbiddenException(`Wallet with id ${walletId} does not exists`);
    }
    return await this.prismaService.user.update({
      where:{
        id: userId
      },
      data:{
        wallets:{
          connect:{
            id: walletId
          }
        }
      }
    })
  }

  // removeWalletFromUser
  async removeWalletFromUser(userId: number, walletId: number){
    this.doesUserExists(userId)
    if(await this.prismaService.wallet.count({
      where:{
        id: walletId
      }
    }) == 0){
      throw new ForbiddenException(`Wallet with id ${walletId} does not exists`);
    }
    return await this.prismaService.user.update({
      where:{
        id: userId
      },
      data:{
        wallets:{
          disconnect:{
            id: walletId
          }
        }
      }
    })
  }

}

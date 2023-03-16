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
    let encryptedPassword;
    try{
        encryptedPassword = this.encryptPassword(userDto.password)
    }
    catch(err){
      return {message: err};
    }

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
    await this.prismaService.user.delete({
      where: {
        id: userId
      }
    })
    return {message: `Successfully deleted user with id: ${userId}`};
  }

}

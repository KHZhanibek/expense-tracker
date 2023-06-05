
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Get, Injectable, NotFoundException } from '@nestjs/common';
import { LoginPhoneDto, LoginEmailDto, RegisterDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.module';
import * as bcrypt from 'bcrypt'
import { randomBytes } from 'crypto';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (user) {
      if(user.confirmed)
        throw new ForbiddenException('Email already in use');
      else {
        if(user.registeredAt.getTime() + 60*60*1000 < Date.now()){
          await this.prisma.user.delete({
            where: { id: user.id },
          });
          throw new ForbiddenException('Email confirmation expired, register again');
        }
        throw new ForbiddenException('Email not confirmed');
      }
    }
    const saltRounds: number = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const salt = bcrypt.genSaltSync(saltRounds)
    let encryptedPassword: string = await bcrypt.hash(dto.password, salt);

    const token = randomBytes(32).toString('hex');

    const confirmationLink = process.env.BASE_URL + `/auth/confirm?token=${token}`;
    await this.emailService.sendConfirmationEmail(dto.email, confirmationLink);
    
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: encryptedPassword,
        firstname: dto.firstname,
        lastname: dto.lastname,
        phone: dto.phone,
        token: token
        },
    });

    return newUser;
  }

  async loginByEmail(dto: LoginEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }
    const tokenData = {
      id: user.id,
      email: user.email
    };
    if(!user.confirmed) {
      if(user.registeredAt.getTime() + 60*60*1000 < Date.now()){
        await this.prisma.user.delete({
          where: { id: user.id },
        });
        throw new ForbiddenException('Email confirmation expired, register again');
      }
      throw new ForbiddenException('Email not confirmed');
    }
    const token = "Bearer " + await this.signToken(tokenData, '1d');
    return {access_token: token};
  }

  async confirm(token: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        token: token
       },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if(user.confirmed) {
      throw new ForbiddenException('Email already confirmed');
    }
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        confirmed: true,
        registeredAt: new Date()
      },
    });
    return {message: "Email confirmed"};
  }



  // async loginByPhone(dto: LoginPhoneDto) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { phone: dto.phone },
  //   });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  //   if (!isPasswordValid) {
  //     throw new ForbiddenException('Invalid credentials');
  //   }
  //   const tokenData = {
  //     id: user.id,
  //     email: user.email
  //   };
  //   const token = await this.signToken(tokenData, '1d');
  //   return {access_token: token};
  // }

  async signToken(tokenData: Object, time: string): Promise<Object> {
    const token = await this.jwt.signAsync(tokenData, {
      expiresIn: time,
      secret: process.env.JWT_SECRET,
    });
    return token;
  }
}

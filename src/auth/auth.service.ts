
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginPhoneDto, LoginEmailDto, RegisterDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.module';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (user) {
      throw new ForbiddenException('Email already in use');
    }
    const saltRounds: number = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const salt = bcrypt.genSaltSync(saltRounds)
    let encryptedPassword: string = await bcrypt.hash(dto.password, salt);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: encryptedPassword,
        firstname: dto.firstname,
        lastname: dto.lastname,
        phone: dto.phone
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
    const token = "Bearer " + await this.signToken(tokenData, '1d');
    return {access_token: token};
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

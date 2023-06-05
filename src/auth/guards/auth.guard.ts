import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService, private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("I am in auth guard");
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if(!authHeader){
      throw new UnauthorizedException("User is not autenticated");
    }
    // console.log(authHeader);
    const token = authHeader.split(' ')[1];
    console.log(token);
    if(token == null || token == undefined){
      throw new UnauthorizedException("User is not autenticated");
    }

    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET
    })

    // console.log(payload);
    const user = await this.prismaService.user.findFirst({
      where: {
        email: payload.email
      }
    })  
    if(!user || user == null || user == undefined)
      throw new UnauthorizedException("Invalid token, user not found");
    request.user = user;
    return true;
    
  }
}


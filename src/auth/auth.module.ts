import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { EmailService } from './email.service';

@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET || 'SECRET',
        signOptions: {
          expiresIn: '24h'
        }
      })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, EmailService],
    exports: [JwtModule, AuthService]
})
export class AuthModule {}

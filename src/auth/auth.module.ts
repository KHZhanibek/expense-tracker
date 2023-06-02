import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET || 'SECRET',
        signOptions: {
          expiresIn: '24h'
        }
      })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [JwtModule, AuthService]
})
export class AuthModule {}

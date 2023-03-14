import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ envFilePath: '.env' }), PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

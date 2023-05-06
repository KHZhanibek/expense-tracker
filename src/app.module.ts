import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ envFilePath: '.env' }), PrismaModule, UserModule, WalletModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

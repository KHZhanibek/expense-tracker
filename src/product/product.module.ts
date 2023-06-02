import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService, JwtService]
})
export class ProductModule {}

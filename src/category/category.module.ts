import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CategoryService, JwtService],
  controllers: [CategoryController]
})
export class CategoryModule {}

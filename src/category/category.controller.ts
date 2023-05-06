import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateDto } from './dto/create.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(){
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategory(@Param('id', ParseIntPipe) categoryId: number){
    return this.categoryService.getCategory(categoryId);
  }

  @Post()
  async createWallet(@Body() categoryDto: CreateDto){
    return this.categoryService.createCategory(categoryDto);
  }

  @Put(':id')
  async updateWallet(@Param('id', ParseIntPipe) categoryId: number, @Body() categoryDto: CreateDto){
    return this.categoryService.updateCategory(categoryId, categoryDto);
  }

  @Delete(':id')
  async deleteWallet(@Param('id', ParseIntPipe) categoryId: number){
    return this.categoryService.deleteCategory(categoryId);
  }

  
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get all categories'})
  @UseGuards(AuthGuard)
  @Get()
  async getAllCategories(){
    return this.categoryService.getAllCategories();
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get category by id'})
  @UseGuards(AuthGuard)
  @Get(':id')
  async getCategory(@Param('id', ParseIntPipe) categoryId: number){
    return this.categoryService.getCategory(categoryId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Create category'})
  @UseGuards(AuthGuard)
  @Post()
  async createWallet(@Body() categoryDto: CreateCategoryDto){
    return this.categoryService.createCategory(categoryDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Update category'})
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateWallet(@Param('id', ParseIntPipe) categoryId: number, @Body() categoryDto: CreateCategoryDto){
    return this.categoryService.updateCategory(categoryId, categoryDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete category'})
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteWallet(@Param('id', ParseIntPipe) categoryId: number){
    return this.categoryService.deleteCategory(categoryId);
  }

  
}

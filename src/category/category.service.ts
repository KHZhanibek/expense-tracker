import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create.category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService){}

  async getAllCategories(){
    return await this.prismaService.category.findMany();
  }


  async getCategory(categoryId: number){
    return await this.prismaService.category.findFirst({
      where:{
        id: categoryId
      }
    })
  }

  async createCategory(categoryDto: CreateCategoryDto){
    const newCategory = await this.prismaService.category.create({
      data:{
        title: categoryDto.title,
        description: categoryDto.description,
      }
    })
    return {
      message: `Successfully created category`,
      category: newCategory
    };
  }

  async updateCategory(categoryId: number, categoryDto: CreateCategoryDto){
    if(!this.categoryExists(categoryId))
      return {message: `Category with id: ${categoryId} does not exists`}

    const updatedCategory = await this.prismaService.category.update({
      where:{
        id: categoryId
      },
      data:{
        title: categoryDto.title,
        description: categoryDto.description,
      }
    })

    return {
      message: `Successfully updated category`,
      category: updatedCategory
    };
  }

  async deleteCategory(categoryId: number){
    if(!this.categoryExists(categoryId))
      return {message: `Category with id: ${categoryId} does not exists`}

    const deletedCategory = await this.prismaService.category.delete({
      where:{
        id: categoryId
      }
    })

    return {
      message: `Successfully deleted category`,
      category: deletedCategory
    };
  }

  async categoryExists(categoryId: number){
    const countCategory = await this.prismaService.category.count({
      where:{
        id: categoryId
      }
    })
    if(countCategory == 0)
      return false;
    return true;
  } 

}

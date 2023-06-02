import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/expense/dto/create.product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductService {
  
  constructor(private prismaService: PrismaService){}

  async getAllProducts(){
    return await this.prismaService.product.findMany();
  }

  async getProductById(id: number){
    return await this.prismaService.product.findUnique({
      where: {
        id: id
      }
    });
  }

  async updateProduct(id: number, productDto: UpdateProductDto){
    if(!this.productExists(id))
      return {message: `Product with id: ${id} does not exists`}

    const updatedProduct = await this.prismaService.product.update({
      where:{
        id: id
      },
      data:{
        name: productDto.name,
        price: productDto.price,
      }
    })

    return {
      message: `Successfully updated category`,
      category: updatedProduct
    };
  }

  async deleteProduct(id: number){
    if(!this.productExists(id))
      return {message: `Product with id: ${id} does not exists`}

    const deletedProduct = await this.prismaService.product.delete({
      where:{
        id: id
      }
    })

    return {
      message: `Successfully deleted product`,
      category: deletedProduct
    };
  }

  private async productExists(id: number){
    const product = await this.prismaService.product.findUnique({
      where:{
        id: id
      }
    })
    if(product)
      return true;
    return false;
  }


}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create.dto';

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

  async updateProduct(id: number, productDto: CreateDto){
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

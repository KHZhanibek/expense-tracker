import { Controller, Delete, Get, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateDto } from './dto/create.dto';

@Controller('product')
export class ProductController {

  constructor(private productService: ProductService){}

  @Get()
  getAllProducts(){
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(id: number){
    return this.productService.getProductById(id);
  }

  @Put(':id')
  updateProduct(id: number, productDto: CreateDto){
    return this.productService.updateProduct(id, productDto);
  }

  @Delete(':id')
  deleteProduct(id: number){
    return this.productService.deleteProduct(id);
  }


}

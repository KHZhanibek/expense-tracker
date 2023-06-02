import { Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateProductDto } from './dto/update.product.dto';


@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService){}

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get all products'})
  @UseGuards(AuthGuard)
  @Get()
  async getAllProducts(){
    return this.productService.getAllProducts();
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get product by id'})
  @UseGuards(AuthGuard)
  @Get(':id')
  async getProductById(id: number){
    return this.productService.getProductById(id);
  }

  // @ApiBearerAuth()
  // @ApiOperation({summary: 'Create product'})
  // @UseGuards(AuthGuard)
  // @Post()
  // async createProduct(productDto: CreateProductDto, walletId: number){
  //   return this.productService.createProduct(productDto, walletId);
  // }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Update product'})
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(id: number, productDto: UpdateProductDto){
    return this.productService.updateProduct(id, productDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete product'})
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(id: number){
    return this.productService.deleteProduct(id);
  }
  
}

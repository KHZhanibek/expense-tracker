import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import e from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateExpenseDto } from './dto/create.expense.dto';
import { CreateProductDto } from './dto/create.product.dto';

@ApiTags('expenses')
@Controller('expenses')
export class ExpenseController {

  constructor(private readonly expenseService: ExpenseService){}

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get all expenses'})
  @UseGuards(AuthGuard)
  @Get()
  async getAllExpenses(){
    return this.expenseService.getAllExpenses();
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get expense by id'})
  @UseGuards(AuthGuard)
  @Get(':id')
  async getExpenseById(id: number){
    return this.expenseService.getExpense(id);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Get products of expense'})
  @UseGuards(AuthGuard)
  @Get(':id/products')
  async getExpenseProducts(id: number){
    return this.expenseService.getExpenseProducts(id);
  }

  // @ApiBearerAuth()
  // @ApiOperation({summary: 'Create expense'})
  // @UseGuards(AuthGuard)
  // @Post()
  // async createExpense(expenseDto: CreateExpenseDto, walletId: number){
  //   return this.expenseService.createExpense(expenseDto, walletId);
  // }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Update expense'})
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateExpense(id: number, expenseDto: CreateExpenseDto){
    return this.expenseService.updateExpense(id, expenseDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete expense'})
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteExpense(id: number){
    return this.expenseService.deleteExpense(id);
  }

  // @ApiBearerAuth()
  // @ApiOperation({summary: 'Create products of expense'})
  // @UseGuards(AuthGuard)
  // @Post(':id/products')
  // async createExpenseProducts(id: number, products: CreateProductDto){
  //   return this.expenseService.createExpenseProducts(id, products);
  // }





}

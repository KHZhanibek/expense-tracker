import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto, ExpenseType } from './dto/create.expense.dto';
import { Decimal } from '@prisma/client/runtime';
import { CreateProductDto } from './dto/create.product.dto';

@Injectable()
export class ExpenseService {
  constructor(private prismaService: PrismaService){}

  async getAllExpenses(){
    return await this.prismaService.expense.findMany({});
  }

  async getExpense(expenseId: number){
    return await this.prismaService.expense.findFirst({
      where:{
        id: expenseId
      }
    })
  }

  // async createExpense(expenseDto: CreateExpenseDto, walletId: number){
  //   const { title, description } = expenseDto;
  //   // Create the expense record
  //   let x: Decimal.Value;
  //   if (expenseDto.type == ExpenseType.EXPENSE)
  //     x = -1;
  //   else
  //     x = 1;
  //   const newExpense = await this.prismaService.expense.create({
  //     data: {
  //       title,
  //       description,
  //       amount: x,
  //       wallet: { connect: { id: walletId } },
  //     },
  //   });
  //   // Get the category id
  //   const categories = await this.prismaService.$queryRaw `
  //     SELECT *
  //     FROM products
  //     WHERE name ILIKE '%' || ${title} || '%'
  //     ORDER BY similarity(name, ${title}) DESC;
  //   `;
  //   const categoryId = categories[0].category_id;


  //   return {
  //     message: 'Expense created successfully',
  //     expense: newExpense,
  //   };
  // }

  async updateExpense(expenseId: number, expenseDto: CreateExpenseDto){
    const { title, description } = expenseDto;
    const updatedExpense = await this.prismaService.expense.update({
      where:{
        id: expenseId
      },
      data:{
        title,
        description,
      }
    })

    return {
      message: 'Expense updated successfully',
      expense: updatedExpense,
    };
  }

  async deleteExpense(expenseId: number){
    if(!this.getExpense(expenseId))
      return {message: `Expense with id: ${expenseId} does not exists`}
    const deletedExpense = await this.prismaService.expense.delete({
      where:{
        id: expenseId
      }
    })

    return {
      message: 'Expense deleted successfully',
      expense: deletedExpense,
    };
  }

  async getExpenseProducts(expenseId: number){
    if(!this.getExpense(expenseId))
      return {message: `Expense with id: ${expenseId} does not exists`}
    return await this.prismaService.product.findMany({
      where:{
        expense: {
          id: expenseId
        }
      }
    })
  }

  // async createExpenseProducts(expenseId: number, productDto: CreateProductDto[]){

  //   if(!this.getExpense(expenseId))
  //     return {message: `Expense with id: ${expenseId} does not exists`}

  //   const newProducts = await Promise.all(productDto.map(async (product) => {
  //     const { name, price } = product;
  //     await this.prismaService.product.createMany({
  //       data: {
  //         name,
  //         price,
  //         expense: { connect: { id: expenseId } },
  //       },
  //     });
  //   }));

  //   let priceSum;
  //   productDto.forEach(async (product) => {
  //     priceSum += product.price;
  //   });

  //   await this.prismaService.expense.update({
  //     where:{
  //       id: expenseId
  //     },
  //     data:{
  //       amount: priceSum * amount
  //     }

  //   return {
  //     message: 'Products created successfully',
  //     products: newProducts,
  //   };

  // }
}

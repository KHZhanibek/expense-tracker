import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class ExpenseService {
  constructor(private prismaService: PrismaService){}

  async getAllExpenses(){
    return await this.prismaService.expense.findMany();
  }

  async getExpense(expenseId: number){
    return await this.prismaService.expense.findFirst({
      where:{
        id: expenseId
      }
    })
  }

  async createExpense(expenseDto: CreateDto, walletId: number){
    const { title, description, products } = expenseDto;
    // Create the expense record
    const newExpense = await this.prismaService.expense.create({
      data: {
        title,
        description,
        amount: 0,
        wallet: { connect: { id: walletId } },
      },
    });
    // Get the category id
    const categories = await this.prismaService.$queryRaw `
      SELECT *
      FROM products
      WHERE name ILIKE '%' || ${title} || '%'
      ORDER BY similarity(name, ${title}) DESC;
    `;
    const categoryId = categories[0].category_id;

    // Create the associated products
    const productPromises = products.map((product) =>
      this.prismaService.product.create({
        data: {
          name: product.name,
          price: product.price,
          expense: { connect: { id: newExpense.id } },
          category: { connect: { id: categoryId } },
        },
      })
    );

    await Promise.all(productPromises);

    return {
      message: 'Expense created successfully',
      expense: newExpense,
    };
  }

  async updateExpense(expenseId: number, expenseDto: CreateDto){
    const { title, description, products } = expenseDto;
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
}

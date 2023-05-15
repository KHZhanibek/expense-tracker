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

  async createExpense(expenseDto: CreateDto){
    
  }
    

}

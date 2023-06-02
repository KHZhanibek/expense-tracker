import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, JwtService]
})
export class ExpenseModule {}

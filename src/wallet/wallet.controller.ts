import { Controller } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('wallet')
export class WalletController {
  constructor(private prismaSerivce: PrismaService){}

}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionDto } from 'src/dto';
import { TransactionService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionService) {}
  @Post('send-btc')
  sendBtc(@Body() transactionDto: TransactionDto) {
    return this.transactionService.sendBtc(transactionDto);
  }

  @Get('total-btc-sent')
  getTransactions() {
    return this.transactionService.getTransactions();
  }
}

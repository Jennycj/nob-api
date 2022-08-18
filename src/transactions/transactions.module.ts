import { Module } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BtcTransactionSend } from 'src/typeorm/transaction.send.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([BtcTransactionSend]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [TransactionService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}

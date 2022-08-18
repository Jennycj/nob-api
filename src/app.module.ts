import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { TransactionsModule } from './transactions/transactions.module';
import { config } from './typeorm/db.config';

@Module({
  imports: [
    HttpModule,
    TransactionsModule,
    TypeOrmModule.forRoot(config),
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

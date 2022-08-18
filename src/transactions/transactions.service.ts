import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { TransactionDto } from 'src/dto';
import { BtcTransactionSend } from '../typeorm/transaction.send.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(BtcTransactionSend)
    private transactionRepository: Repository<BtcTransactionSend>,
    private config: ConfigService,
  ) {}
  url = this.config.get('BASE_URL');
  apiKey = this.config.get('API_KEY');
  async sendBtc(transactionDto: TransactionDto): Promise<BtcTransactionSend> {
    const requestUrl = `${this.url}/wallets/send_bitcoin`;

    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    };

    const responseData = await lastValueFrom(
      this.httpService.post(requestUrl, transactionDto, requestConfig).pipe(
        map((response) => {
          return response.data;
        }),
      ),
    );

    const newTransaction = this.transactionRepository.create({
      id: responseData.data.id,
      address: responseData.data.address,
      customerId: responseData.data.customerId,
      description: responseData.data.description,
      reference: responseData.data.reference,
      amount: responseData.data.amount,
      fees: responseData.data.fees,
      btcFees: responseData.data.btcFees,
      btcAmount: responseData.data.btcAmount,
      satFees: responseData.data.satFees,
      satAmount: responseData.data.satAmount,
      spotPrice: responseData.data.spotPrice,
      action: responseData.data.action,
      channel: responseData.data.channel,
      type: responseData.data.type,
      created_at: responseData.data.created_at,
      updated_at: responseData.data.updated_at,
    });
    return await this.transactionRepository.save(newTransaction);
  }

  async getTransactions() {
    const requestUrl = `${this.url}/transactions`;

    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    };

    const responseData = await lastValueFrom(
      this.httpService.get(requestUrl, requestConfig).pipe(
        map((response) => {
          return response.data;
        }),
      ),
    );

    // const data = responseData.data.transactions;
    const data = this.transactionRepository.find();
    console.log(data);
    // const sentTransactions = data.filter(
    //   (transaction: { action: string }) =>
    //     transaction.action === 'send_bitcoin',
    // );
    // return sentTransactions;
    return data;
  }
}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BtcAddress } from './address.entity';
import { BtcTransactionSend } from './transaction.send.entity';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: '2081',
  port: 5432,
  host: '127.0.0.1',
  database: 'nob_api',
  synchronize: true,
  entities: [BtcTransactionSend, BtcAddress],
};

import { v4 as uuidv4 } from 'uuid';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class BtcTransactionSend {
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column()
  address: string;

  @Column()
  @IsEmail()
  customerId: string;

  @Column()
  description: string;

  @Column()
  reference: string;

  @Column()
  amount: string;

  @Column()
  fees: string;

  @Column()
  btcFees: string;

  @Column()
  btcAmount: string;

  @Column()
  satFees: string;

  @Column()
  satAmount: string;

  @Column()
  action: string;

  @Column()
  channel: string;

  @Column()
  type: string;

  @Column()
  spotPrice: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import { v4 as uuidv4 } from 'uuid';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BtcAddress {
  @PrimaryGeneratedColumn('uuid')
  id = uuidv4();

  @Column()
  address: string;

  @Column()
  label: string;

  @Column()
  addressType: string;

  // @Column()
  // satoshis: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

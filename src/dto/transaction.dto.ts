import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class TransactionDto {
  @IsNumber()
  satoshis: number;

  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  description: string;

  priorityLevel: string;
}

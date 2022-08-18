import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  label: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  formatType: string;

  // @IsNumberString()
  // satoshis: number;
}

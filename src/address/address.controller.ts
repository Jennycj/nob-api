import { Body, Controller, Post } from '@nestjs/common';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}
  @Post('create')
  createAddress(@Body() addressDto: AddressDto) {
    return this.addressService.createAddress(addressDto);
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { AddressDto } from '../dto';
import { BtcAddress } from '../typeorm/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(BtcAddress)
    private addressRepository: Repository<BtcAddress>,
    private config: ConfigService,
  ) {}
  async createAddress(addressDto: AddressDto): Promise<BtcAddress> {
    const url = this.config.get('BASE_URL');
    const apiKey = this.config.get('API_KEY');

    const requestUrl = `${url}/addresses/generate`;
    console.log(requestUrl);

    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const responseData = await lastValueFrom(
      this.httpService.post(requestUrl, addressDto, requestConfig).pipe(
        map((response) => {
          return response.data;
        }),
      ),
    );

    console.log(responseData);

    const newAddress = this.addressRepository.create({
      id: responseData.data.id,
      address: responseData.data.address,
      label: responseData.data.label,
      addressType: responseData.data.addressType,
      created_at: responseData.data.created_at,
      updated_at: responseData.data.updated_at,
    });
    return await this.addressRepository.save(newAddress);
  }
}

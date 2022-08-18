import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BtcAddress } from 'src/typeorm/address.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([BtcAddress]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}

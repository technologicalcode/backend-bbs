import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarbershopController } from './barbershop.controller';
import { BarbershopService } from './barbershop.service';
import { BarbershopEntity } from './entity/barbershop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BarbershopEntity])],
  controllers: [BarbershopController],
  providers: [BarbershopService],
})
export class BarbershopModule {}

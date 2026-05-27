import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberoController } from './barbero.controller';
import { BarberoService } from './barbero.service';
import { BarberoEntity } from './entity/barbero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BarberoEntity])],
  controllers: [BarberoController],
  providers: [BarberoService],
  exports: [BarberoService],
})
export class BarberoModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegocioController } from './negocio.controller';
import { NegocioService } from './negocio.service';
import { TipoNegocioController } from './tipo-negocio/tipo-negocio.controller';
import { TipoNegocioService } from './tipo-negocio/tipo-negocio.service';
import { NegocioEntity } from './entity/negocio.entity';
import { TipoNegocioEntity } from './entity/tipo-negocio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NegocioEntity, TipoNegocioEntity])],
  controllers: [NegocioController, TipoNegocioController],
  providers: [NegocioService, TipoNegocioService],
  exports: [NegocioService, TipoNegocioService, TypeOrmModule],
})
export class NegocioModule {}

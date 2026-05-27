import { Module } from '@nestjs/common';
import { NegocioController } from './negocio.controller';
import { NegocioService } from './negocio.service';
import { TipoNegocioController } from './tipo-negocio/tipo-negocio.controller';
import { TipoNegocioService } from './tipo-negocio/tipo-negocio.service';

@Module({
  controllers: [NegocioController, TipoNegocioController],
  providers: [NegocioService, TipoNegocioService],
  exports: [NegocioService, TipoNegocioService],
})
export class NegocioModule {}

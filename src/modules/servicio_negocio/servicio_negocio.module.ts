import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicioNegocioEntity } from "./entity/servicio_negocio.entity";
import { serviciosNegocioController } from "./servicio_negocio.controller";
import { ServiciosEntity } from "./entity/servicios.entity";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([ServicioNegocioEntity, ServiciosEntity])],
    controllers: [serviciosNegocioController],
    exports : [TypeOrmModule]

    
})
export class servicioModulo{}

// @Module({
//     imports: [TypeOrmModule.forFeature([NegocioEntity, TipoNegocioEntity])],
//     controllers: [NegocioController, TipoNegocioController],
//     providers: [NegocioService, TipoNegocioService],
//     exports: [NegocioService, TipoNegocioService, TypeOrmModule],
//   })
//   export class NegocioModule {}
  
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicioNegocioEntity } from "./entity/servicio_negocio.entity";
import { serviciosNegocioController } from "./servicio_negocio.controller";
import { ServiciosService } from "./servicios/servicios.service";
import { ServiciosEntity } from "./entity/servicios.entity";
import { Module } from "@nestjs/common";
import { servicioNegocioService } from "./servicio_negocio.service";
import { ServiciosController } from "./servicios/servicios.controller";
import { LoginPayload } from "src/auth/login/interface/login.interface";

@Module({
    imports: [TypeOrmModule.forFeature([ServicioNegocioEntity, ServiciosEntity])],
    controllers: [serviciosNegocioController, ServiciosController],
    providers : [servicioNegocioService, ServiciosService],
    exports : [TypeOrmModule]  
})
export class servicioModulo{}


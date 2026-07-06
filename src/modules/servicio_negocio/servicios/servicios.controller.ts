import {
    Controller,
    Param,
    Body,
    Post,
    Patch,
    Delete,
    Get,
    ParseIntPipe,
} from '@nestjs/common';
import { ServiciosService } from "./servicios.service";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import type { LoginPayload } from "src/auth/login/interface/login.interface";
import type { IServicio } from "../interfaces/servicio.interface";




@Controller('servicios')
export class ServiciosController {

    constructor(private readonly servicioSrv: ServiciosService) { }

    @Post('create')
    createServicio(
        @Body() dto: IServicio,
        @CurrentUser() user: LoginPayload,
    ) {
        return this.servicioSrv.createServicio(dto, user.id_usuario)
    }

    @Patch('id_servicio')
    updateServicio(
        @Param() idservicio: number,
        @Body() servicioMod: IServicio
    ) {
        return this.servicioSrv.updateService(idservicio,servicioMod)
    }

    @Delete(':id_servicio')
    deleteServicio(
        @Param('id_servicio', ParseIntPipe) id_servicio: number,
    ) {
        return this.servicioSrv.deleteServicio(id_servicio);
    }


    @Get(':id_negocio')
    getServices(@Param() idnegocio : number){
        return this.servicioSrv.findAllServices(idnegocio)
    }
    
}


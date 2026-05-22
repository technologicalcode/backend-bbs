import { Controller, Get } from '@nestjs/common';
import { CitasService } from './citas.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('citas')
export class CitasController {
    constructor(private readonly citasService: CitasService) {

    }

    @Public()
    @Get('cargar-citas')
    async cargarCitas(){
        return this.citasService.CargarCitas();
    }
}

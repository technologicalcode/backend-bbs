import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CitasService } from './citas.service';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Public()
  @Get('cargar-citas')
  cargarCitas() {
    return this.citasService.cargarCitas();
  }
}

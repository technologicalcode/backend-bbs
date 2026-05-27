import { Controller } from '@nestjs/common';
import { TipoNegocioService } from './tipo-negocio.service';

@Controller('tipo-negocio')
export class TipoNegocioController {
  constructor(private readonly tipoNegocioService: TipoNegocioService) {}
}

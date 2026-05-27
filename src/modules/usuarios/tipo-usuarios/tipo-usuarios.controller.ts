import { Controller } from '@nestjs/common';
import { TipoUsuariosService } from './tipo-usuarios.service';

@Controller('tipo-usuarios')
export class TipoUsuariosController {
  constructor(private readonly tipoUsuariosService: TipoUsuariosService) {}
}

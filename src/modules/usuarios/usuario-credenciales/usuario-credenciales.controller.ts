import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { UsuarioCredencialesService } from './usuario-credenciales.service';
import { CreateUsuarioCredencialesDto } from './dto/usuario-credenciales.dto';

@Controller('usuario-credenciales')
export class UsuarioCredencialesController {
  constructor(
    private readonly usuarioCredencialesService: UsuarioCredencialesService,
  ) {}

  @Public()
  @Post('create')
  create(@Body() dto: CreateUsuarioCredencialesDto) {
    return this.usuarioCredencialesService.create(dto);
  }
}

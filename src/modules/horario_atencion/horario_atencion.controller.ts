import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { HorarioAtencionService } from './horario_atencion.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { LoginPayload } from 'src/auth/login/interface/login.interface';
import { CreateHorarioAtencionDto } from './dto/horario_atencion.dto';

@Controller('horario-atencion')
export class HorarioAtencionController {
  constructor(private readonly horarioSrv: HorarioAtencionService) {}

  @Post('create')
  createHorarioAtencion(
    @Body() dto: CreateHorarioAtencionDto,
    @CurrentUser() user: LoginPayload,
  ) {
    return this.horarioSrv.createHorarioAtencion(dto, user.id_usuario);
  }
}

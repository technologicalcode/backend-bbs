import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { CreateHorarioAtencionDto } from './dto/horario_atencion.dto';
import { HorarioAtencionService } from './horario_atencion.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { LoginPayload } from 'src/auth/login/interface/login.interface';

@Controller('horario-atencion')
export class HorarioAtencionController {
  constructor(private readonly horarioSrv: HorarioAtencionService) {}

  @Post('create')
  createHorarioAtencion(
    @Body(new ParseArrayPipe({ items: CreateHorarioAtencionDto }))
    dto: CreateHorarioAtencionDto[],
    @CurrentUser() user: LoginPayload,
  ) {
    const idbb = user.id_bb;
    return this.horarioSrv.createHorarioAtencion(dto, idbb);
  }
}

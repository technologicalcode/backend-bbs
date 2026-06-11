import { BadRequestException } from '@nestjs/common';
import { CreateHorarioAtencionDto } from '../dto/horario_atencion.dto';

export const verificarIndependiente = (
  dto: CreateHorarioAtencionDto,
  idUsuario: number,
): CreateHorarioAtencionDto => {
  if (!dto.es_independiente) {
    return dto;
  }

  for (const empleado of dto.empleados) {
      empleado.id_usuario = idUsuario;
  }

  return dto;
};

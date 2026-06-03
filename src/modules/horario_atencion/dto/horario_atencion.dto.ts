import { applyDecorators } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import type { TransformFnParams } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
  ValidateIf,
} from 'class-validator';

/** HH:mm o HH:mm:ss (24 h) */
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

function emptyStringToNull({ value }: TransformFnParams): unknown {
  if (value === '' || value === undefined) {
    return null;
  }
  return value;
}

function OptionalTimeField(message: string) {
  return applyDecorators(
    IsOptional(),
    Transform(emptyStringToNull),
    ValidateIf((_, value) => value != null),
    IsString(),
    Matches(TIME_PATTERN, { message }),
  );
}

export class CreateHorarioAtencionDto {
  
  id_usuario: number;

  @OptionalTimeField('hora_inicio debe tener formato HH:mm o HH:mm:ss')
  hora_inicio?: string | null;

  @OptionalTimeField('hora_fin debe tener formato HH:mm o HH:mm:ss')
  hora_fin?: string | null;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  duracion_slot: number;

  tiempo_libre: number;

  bloqueos_horario: DtaBloqueoHorario[];
}

class DtaBloqueoHorario{
  
  id_horario_atencion: number;

  hora_inicio: string;

  hora_fin: string;

  motivo: string | null;

}

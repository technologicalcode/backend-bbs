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
  @OptionalTimeField('hora_inicio debe tener formato HH:mm o HH:mm:ss')
  hora_inicio?: string | null;

  @OptionalTimeField('hora_fin debe tener formato HH:mm o HH:mm:ss')
  hora_fin?: string | null;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  estado_ha: number;

  @OptionalTimeField(
    'horas_ausencia_inicio debe tener formato HH:mm o HH:mm:ss',
  )
  horas_ausencia_inicio?: string | null;

  @OptionalTimeField('horas_ausencia_fin debe tener formato HH:mm o HH:mm:ss')
  horas_ausencia_fin?: string | null;

  @OptionalTimeField('tiempo_proceso debe tener formato HH:mm o HH:mm:ss')
  tiempo_proceso?: string | null;
}

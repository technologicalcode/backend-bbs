import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^\d{2}:\d{2}(:\d{2})?$/;

export class BloqueoHaDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id_horario_atencion?: number;

  @IsString()
  @IsNotEmpty()
  @Matches(TIME_REGEX, {
    message: 'hora_inicio debe tener formato HH:mm o HH:mm:ss',
  })
  hora_inicio: string;

  @IsString()
  @IsNotEmpty()
  @Matches(TIME_REGEX, {
    message: 'hora_fin debe tener formato HH:mm o HH:mm:ss',
  })
  hora_fin: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  motivo: string;
}

export class PatronHaDto {
  @IsString()
  @IsNotEmpty()
  @Matches(DATE_REGEX, { message: 'fecha debe tener formato YYYY-MM-DD' })
  fecha: string;

  @IsString()
  @IsNotEmpty()
  @Matches(TIME_REGEX, {
    message: 'hora_inicio debe tener formato HH:mm o HH:mm:ss',
  })
  hora_inicio: string;

  @IsString()
  @IsNotEmpty()
  @Matches(TIME_REGEX, {
    message: 'hora_fin debe tener formato HH:mm o HH:mm:ss',
  })
  hora_fin: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @Matches(DATE_REGEX, {
    each: true,
    message: 'cada fecha en repetir_en_fechas debe tener formato YYYY-MM-DD',
  })
  repetir_en_fechas: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BloqueoHaDto)
  bloqueos?: BloqueoHaDto[] | [];
}

export class EmpleadoHaDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id_usuario?: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PatronHaDto)
  Patron: PatronHaDto[];
}

export class CreateHorarioAtencionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id_negocio: number;

  @IsBoolean()
  @IsNotEmpty()
  es_independiente: boolean;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  duracion_slot: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  tiempo_entre_slot: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EmpleadoHaDto)
  empleados: EmpleadoHaDto[];
}

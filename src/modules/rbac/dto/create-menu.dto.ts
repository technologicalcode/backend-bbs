import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  nombre: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  orden?: number;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  icono?: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  path?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id_permiso?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id_padre?: number;
}

import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateRolPermisoDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id_rol: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id_permiso: number;
}

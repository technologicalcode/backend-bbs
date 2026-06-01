import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateUsuarioRolDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id_usuario: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id_rol: number;
}

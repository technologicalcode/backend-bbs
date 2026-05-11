import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateUsuarioRolDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id_user: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id_rol: number;
}

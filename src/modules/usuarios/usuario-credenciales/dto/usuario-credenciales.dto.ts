import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUsuarioCredencialesDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsOptional()
  id_usuario?: number;

  /** Compatibilidad con el DTO antiguo (`UserDto.id_bb`). */
  @IsNumber()
  @IsOptional()
  id_bb?: number;
}

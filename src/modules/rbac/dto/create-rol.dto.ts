import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRolDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  nombre: string;
}

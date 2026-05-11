import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePermisoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  codigo: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  nombre?: string;
}

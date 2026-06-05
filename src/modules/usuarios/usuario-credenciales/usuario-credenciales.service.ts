import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/core/interface/api-response';
import { UsuarioCredencialesEntity } from '../entity/usuario-credenciales.entity';
import { CreateUsuarioCredencialesDto } from './dto/usuario-credenciales.dto';

@Injectable()
export class UsuarioCredencialesService {
  constructor(
    @InjectRepository(UsuarioCredencialesEntity)
    private readonly credencialesRepo: Repository<UsuarioCredencialesEntity>,
  ) {}

  async create(
    dto: CreateUsuarioCredencialesDto,
  ): Promise<ApiResponse> {
    const idUsuario = dto.id_usuario ?? dto.id_bb;
    if (idUsuario == null) {
      return {
        status: false,
        message: 'id_usuario es obligatorio',
        data: null,
      };
    }

    const password = await hash(dto.password, 10);

    const newCredencial = this.credencialesRepo.create({
      username: dto.username,
      password,
      id_usuario: idUsuario,
    });

    const result = await this.credencialesRepo.save(newCredencial);

    if (result) {
      return {
        status: true,
        message: 'Credenciales creadas correctamente',
        data: {
          id_usuario_credencial: result.id_usuario_credencial,
          username: result.username,
          id_usuario: result.id_usuario,
        },
      };
    }

    return {
      status: false,
      message: 'No se pudieron crear las credenciales',
      data: null,
    };
  }
}

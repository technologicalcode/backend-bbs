import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarberoEntity } from 'src/modules/barbero/entity/barbero.entity';
import { UsuarioCredencialesEntity } from 'src/modules/usuarios/entity/usuario-credenciales.entity';
import { UsuariosEntity } from 'src/modules/usuarios/entity/usuarios.entity';
import { toLoginPayload } from 'src/modules/usuarios/usuario-credenciales/helper/credencial-login.helper';
import type { SessionUserDto } from '../session.interface';

@Injectable()
export class SessionUserService {
  constructor(
    @InjectRepository(UsuarioCredencialesEntity)
    private readonly credencialesRepo: Repository<UsuarioCredencialesEntity>,
    @InjectRepository(BarberoEntity)
    private readonly barberoRepo: Repository<BarberoEntity>,
    @InjectRepository(UsuariosEntity)
    private readonly usuariosRepo: Repository<UsuariosEntity>,
  ) {}

  async loadUser(idUsuarioCredencial: number): Promise<SessionUserDto> {
    const credencial = await this.credencialesRepo.findOne({
      where: { id_usuario_credencial: idUsuarioCredencial },
      select: ['id_usuario_credencial', 'username', 'id_usuario'],
    });

    if (!credencial) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return toLoginPayload(credencial, this.barberoRepo, this.usuariosRepo);
  }
}

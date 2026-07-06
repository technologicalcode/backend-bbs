import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse, ok } from 'src/core/interface/api-response';
import { UsuariosEntity } from 'src/modules/usuarios/entity/usuarios.entity';
import { RolEntity } from '../entity/rol.entity';
import { UsuarioRolEntity } from '../entity/usuario-rol.entity';
import { CreateUsuarioRolDto } from '../dto/create-usuario-rol.dto';

@Injectable()
export class UsuarioRolAdminService {
  constructor(
    @InjectRepository(UsuariosEntity)
    private readonly usuariosRepo: Repository<UsuariosEntity>,
    @InjectRepository(RolEntity)
    private readonly rolRepo: Repository<RolEntity>,
    @InjectRepository(UsuarioRolEntity)
    private readonly usuarioRolRepo: Repository<UsuarioRolEntity>,
  ) {}

  async createUsuarioRol(
    dto: CreateUsuarioRolDto,
  ): Promise<ApiResponse<UsuarioRolEntity>> {
    const usuario = await this.usuariosRepo.findOne({
      where: { id_usuario: dto.id_usuario },
    });
    if (!usuario) {
      throw new NotFoundException(
        `Usuario id_usuario=${dto.id_usuario} no encontrado`,
      );
    }
    const rol = await this.rolRepo.findOne({ where: { id_rol: dto.id_rol } });
    if (!rol) {
      throw new NotFoundException(`Rol id_rol=${dto.id_rol} no encontrado`);
    }
    const dup = await this.usuarioRolRepo.findOne({
      where: {
        usuario: { id_usuario: dto.id_usuario },
        rol: { id_rol: dto.id_rol },
      },
    });
    if (dup) {
      throw new ConflictException('Ese usuario ya tiene ese rol');
    }
    const row = this.usuarioRolRepo.create({ usuario, rol });
    const saved = await this.usuarioRolRepo.save(row);
    return ok(saved, 'Usuario-rol asignado');
  }
}

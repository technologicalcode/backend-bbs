import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/core/interface/api-response';
import { UserEntity } from 'src/auth/user/entity/user.entity';
import { RolEntity } from '../entity/rol.entity';
import { UsuarioRolEntity } from '../entity/usuario-rol.entity';
import { CreateUsuarioRolDto } from '../dto/create-usuario-rol.dto';

@Injectable()
export class UsuarioRolAdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RolEntity)
    private readonly rolRepo: Repository<RolEntity>,
    @InjectRepository(UsuarioRolEntity)
    private readonly usuarioRolRepo: Repository<UsuarioRolEntity>,
  ) {}

  async createUsuarioRol(
    dto: CreateUsuarioRolDto,
  ): Promise<ApiResponse<UsuarioRolEntity>> {
    const usuario = await this.userRepo.findOne({
      where: { id_user: dto.id_user },
    });
    if (!usuario) {
      throw new NotFoundException(
        `Usuario id_user=${dto.id_user} no encontrado`,
      );
    }
    const rol = await this.rolRepo.findOne({ where: { id_rol: dto.id_rol } });
    if (!rol) {
      throw new NotFoundException(`Rol id_rol=${dto.id_rol} no encontrado`);
    }
    const dup = await this.usuarioRolRepo.findOne({
      where: { usuario: { id_user: dto.id_user }, rol: { id_rol: dto.id_rol } },
    });
    if (dup) {
      throw new ConflictException('Ese usuario ya tiene ese rol');
    }
    const row = this.usuarioRolRepo.create({ usuario, rol });
    const saved = await this.usuarioRolRepo.save(row);
    return {
      status: true,
      message: 'Usuario-rol asignado',
      data: saved,
    };
  }
}

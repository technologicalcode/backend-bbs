import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse, ok } from 'src/core/interface/api-response';
import { RolEntity } from '../entity/rol.entity';
import { PermisoEntity } from '../entity/permiso.entity';
import { RolPermisoEntity } from '../entity/rol-permiso.entity';
import { CreateRolPermisoDto } from '../dto/create-rol-permiso.dto';

@Injectable()
export class RolPermisoAdminService {
  constructor(
    @InjectRepository(RolEntity)
    private readonly rolRepo: Repository<RolEntity>,
    @InjectRepository(PermisoEntity)
    private readonly permisoRepo: Repository<PermisoEntity>,
    @InjectRepository(RolPermisoEntity)
    private readonly rolPermisoRepo: Repository<RolPermisoEntity>,
  ) {}

  async createRolPermiso(
    dto: CreateRolPermisoDto,
  ): Promise<ApiResponse<RolPermisoEntity>> {
    const rol = await this.rolRepo.findOne({ where: { id_rol: dto.id_rol } });
    if (!rol) {
      throw new NotFoundException(`Rol id_rol=${dto.id_rol} no encontrado`);
    }
    const permiso = await this.permisoRepo.findOne({
      where: { id_permiso: dto.id_permiso },
    });
    if (!permiso) {
      throw new NotFoundException(
        `Permiso id_permiso=${dto.id_permiso} no encontrado`,
      );
    }
    const dup = await this.rolPermisoRepo.findOne({
      where: {
        rol: { id_rol: dto.id_rol },
        permiso: { id_permiso: dto.id_permiso },
      },
    });
    if (dup) {
      throw new ConflictException('Ese rol ya tiene asignado ese permiso');
    }
    const row = this.rolPermisoRepo.create({ rol, permiso });
    const saved = await this.rolPermisoRepo.save(row);
    return ok(saved, 'Rol-permiso asignado');
  }
}

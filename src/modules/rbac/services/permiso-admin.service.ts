import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/core/interface/api-response';
import { PermisoEntity } from '../entity/permiso.entity';
import { CreatePermisoDto } from '../dto/create-permiso.dto';

@Injectable()
export class PermisoAdminService {
  constructor(
    @InjectRepository(PermisoEntity)
    private readonly permisoRepo: Repository<PermisoEntity>,
  ) {}

  async createPermiso(
    dto: CreatePermisoDto,
  ): Promise<ApiResponse<PermisoEntity>> {
    const codigo = dto.codigo.trim();
    const exists = await this.permisoRepo.findOne({ where: { codigo } });
    if (exists) {
      throw new ConflictException(`Ya existe un permiso con codigo: ${codigo}`);
    }
    const row = this.permisoRepo.create({
      codigo,
      nombre: dto.nombre?.trim() ?? null,
    });
    const saved = await this.permisoRepo.save(row);
    return {
      status: true,
      message: 'Permiso creado',
      data: saved,
    };
  }
}

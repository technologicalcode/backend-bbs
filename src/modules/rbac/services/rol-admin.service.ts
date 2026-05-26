import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/core/interface/api-response';
import { RolEntity } from '../entity/rol.entity';
import { CreateRolDto } from '../dto/create-rol.dto';

@Injectable()
export class RolAdminService {
  constructor(
    @InjectRepository(RolEntity)
    private readonly rolRepo: Repository<RolEntity>,
  ) {}

  async createRol(dto: CreateRolDto): Promise<ApiResponse<RolEntity>> {
    const exists = await this.rolRepo.findOne({
      where: { codigo: dto.codigo },
    });
    if (exists) {
      throw new ConflictException(`Ya existe un rol con codigo: ${dto.codigo}`);
    }
    const row = this.rolRepo.create({
      codigo: dto.codigo.trim(),
      nombre: dto.nombre.trim(),
    });
    const saved = await this.rolRepo.save(row);
    return {
      status: true,
      message: 'Rol creado',
      data: saved,
    };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/core/interface/api-response';
import { PermisoEntity } from '../entity/permiso.entity';
import { PadreMenuEntity } from '../entity/padre_menu.entity';
import { MenuEntity } from '../entity/menu.entity';
import { CreateMenuDto } from '../dto/create-menu.dto';

@Injectable()
export class MenuAdminService {
  constructor(
    @InjectRepository(PermisoEntity)
    private readonly permisoRepo: Repository<PermisoEntity>,
    @InjectRepository(PadreMenuEntity)
    private readonly padreMenuRepo: Repository<PadreMenuEntity>,
    @InjectRepository(MenuEntity)
    private readonly menuRepo: Repository<MenuEntity>,
  ) {}

  async createMenu(dto: CreateMenuDto): Promise<ApiResponse<MenuEntity>> {
    let permiso: PermisoEntity | null = null;
    if (dto.id_permiso != null) {
      permiso = await this.permisoRepo.findOne({
        where: { id_permiso: dto.id_permiso },
      });
      if (!permiso) {
        throw new NotFoundException(
          `Permiso id_permiso=${dto.id_permiso} no encontrado`,
        );
      }
    }

    let padre_menu: PadreMenuEntity | null = null;
    if (dto.id_padre_menu != null) {
      padre_menu = await this.padreMenuRepo.findOne({
        where: { id_padre_menu: dto.id_padre_menu },
      });
      if (!padre_menu) {
        throw new NotFoundException(
          `Categoría id_padre_menu=${dto.id_padre_menu} no encontrada`,
        );
      }
    }

    const row = this.menuRepo.create({
      descripcion: dto.descripcion.trim(),
      orden: dto.orden ?? 1,
      icono: dto.icono?.trim() ?? null,
      path: dto.path?.trim() ?? null,
      permiso,
      padre_menu,
    });
    const saved = await this.menuRepo.save(row);
    return {
      status: true,
      message: 'Ítem de menú creado',
      data: saved,
    };
  }
}

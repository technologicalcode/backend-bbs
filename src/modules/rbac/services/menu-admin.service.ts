import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/core/interface/api-response';
import { PermisoEntity } from '../entity/permiso.entity';
import { MenuItemEntity } from '../entity/menu-item.entity';
import { CreateMenuDto } from '../dto/create-menu.dto';

@Injectable()
export class MenuAdminService {
  constructor(
    @InjectRepository(PermisoEntity)
    private readonly permisoRepo: Repository<PermisoEntity>,
    @InjectRepository(MenuItemEntity)
    private readonly menuRepo: Repository<MenuItemEntity>,
  ) {}

  async createMenu(dto: CreateMenuDto): Promise<ApiResponse<MenuItemEntity>> {
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
    let padre: MenuItemEntity | null = null;
    if (dto.id_padre != null) {
      padre = await this.menuRepo.findOne({ where: { id_menu: dto.id_padre } });
      if (!padre) {
        throw new NotFoundException(
          `Menú padre id_menu=${dto.id_padre} no encontrado`,
        );
      }
    }
    const row = this.menuRepo.create({
      nombre: dto.nombre.trim(),
      orden: dto.orden ?? 0,
      icono: dto.icono?.trim() ?? null,
      path: dto.path?.trim() ?? null,
      permiso,
      padre,
    });
    const saved = await this.menuRepo.save(row);
    return {
      status: true,
      message: 'Ítem de menú creado',
      data: saved,
    };
  }
}

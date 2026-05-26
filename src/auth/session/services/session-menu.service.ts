import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItemEntity } from 'src/modules/rbac/entity/menu-item.entity';
import type { SessionMenuNode } from '../session.interface';

@Injectable()
export class SessionMenuService {
  constructor(
    @InjectRepository(MenuItemEntity)
    private readonly menuRepo: Repository<MenuItemEntity>,
  ) {}

  async buildMenuForPermisos(
    allowedPermisoIds: Set<number>,
  ): Promise<SessionMenuNode[]> {
    const allMenus = await this.menuRepo.find({
      relations: ['padre', 'permiso'],
      order: { orden: 'ASC' },
    });

    const filteredMenus = allMenus.filter((m) => {
      if (m.permiso == null) {
        return true;
      }
      return allowedPermisoIds.has(m.permiso.id_permiso);
    });

    return this.buildMenuTree(filteredMenus);
  }

  private buildMenuTree(items: MenuItemEntity[]): SessionMenuNode[] {
    const idSet = new Set(items.map((i) => i.id_menu));
    const roots = items.filter((m) => {
      if (m.padre == null) {
        return true;
      }
      return !idSet.has(m.padre.id_menu);
    });
    roots.sort((a, b) => a.orden - b.orden);
    return roots.map((r) => this.menuNode(r, items));
  }

  private menuNode(m: MenuItemEntity, all: MenuItemEntity[]): SessionMenuNode {
    const hijos = all
      .filter((x) => x.padre?.id_menu === m.id_menu)
      .sort((a, b) => a.orden - b.orden)
      .map((c) => this.menuNode(c, all));
    return {
      id_menu: m.id_menu,
      orden: m.orden,
      nombre: m.nombre,
      icono: m.icono,
      path: m.path,
      id_permiso: m.permiso?.id_permiso ?? null,
      hijos,
    };
  }
}

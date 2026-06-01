import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from 'src/modules/rbac/entity/menu.entity';
import { PadreMenuEntity } from 'src/modules/rbac/entity/padre_menu.entity';
import type {
  SessionMenuGroupNode,
  SessionMenuItemNode,
} from '../session.interface';

@Injectable()
export class SessionMenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepo: Repository<MenuEntity>,
    @InjectRepository(PadreMenuEntity)
    private readonly padreMenuRepo: Repository<PadreMenuEntity>,
  ) {}

  async buildMenuForPermisos(
    allowedPermisoIds: Set<number>,
  ): Promise<SessionMenuGroupNode[]> {
    const [padres, items] = await Promise.all([
      this.padreMenuRepo.find({
        where: { estado: 1 },
        order: { descripcion: 'ASC' },
      }),
      this.menuRepo.find({
        where: { estado: 1 },
        relations: ['padre_menu', 'permiso'],
        order: { orden: 'ASC' },
      }),
    ]);

    const filtered = items.filter((m) => {
      if (m.permiso == null) {
        return true;
      }
      return allowedPermisoIds.has(m.permiso.id_permiso);
    });

    const groups: SessionMenuGroupNode[] = padres.map((padre) => ({
      id_padre_menu: padre.id_padre_menu,
      descripcion: padre.descripcion,
      items: filtered
        .filter((m) => m.padre_menu?.id_padre_menu === padre.id_padre_menu)
        .map((m) => this.toMenuItem(m)),
    }));

    const sinPadre = filtered.filter((m) => m.padre_menu == null);
    if (sinPadre.length > 0) {
      groups.push({
        id_padre_menu: 0,
        descripcion: 'General',
        items: sinPadre.map((m) => this.toMenuItem(m)),
      });
    }

    return groups.filter((g) => g.items.length > 0);
  }

  private toMenuItem(m: MenuEntity): SessionMenuItemNode {
    return {
      id_menu: m.id_menu,
      descripcion: m.descripcion,
      orden: m.orden,
      icono: m.icono,
      path: m.path,
      id_permiso: m.permiso?.id_permiso ?? null,
    };
  }
}

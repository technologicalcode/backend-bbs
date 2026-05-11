import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/core/interface/api-response';
import { UserEntity } from '../../auth/user/entity/user.entity';
import { RolEntity } from './entity/rol.entity';
import { PermisoEntity } from './entity/permiso.entity';
import { RolPermisoEntity } from './entity/rol-permiso.entity';
import { UsuarioRolEntity } from './entity/usuario-rol.entity';
import { MenuItemEntity } from './entity/menu-item.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { CreateRolPermisoDto } from './dto/create-rol-permiso.dto';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol.dto';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class RbacAdminService {
  constructor(
    @InjectRepository(RolEntity)
    private readonly rolRepo: Repository<RolEntity>,
    @InjectRepository(PermisoEntity)
    private readonly permisoRepo: Repository<PermisoEntity>,
    @InjectRepository(RolPermisoEntity)
    private readonly rolPermisoRepo: Repository<RolPermisoEntity>,
    @InjectRepository(UsuarioRolEntity)
    private readonly usuarioRolRepo: Repository<UsuarioRolEntity>,
    @InjectRepository(MenuItemEntity)
    private readonly menuRepo: Repository<MenuItemEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createRol(dto: CreateRolDto): Promise<ApiResponse> {
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

  async createPermiso(dto: CreatePermisoDto): Promise<ApiResponse> {
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

  async createRolPermiso(dto: CreateRolPermisoDto): Promise<ApiResponse> {
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
    return {
      status: true,
      message: 'Rol-permiso asignado',
      data: saved,
    };
  }

  async createUsuarioRol(dto: CreateUsuarioRolDto): Promise<ApiResponse> {
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

  async createMenu(dto: CreateMenuDto): Promise<ApiResponse> {
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

export interface SessionMenuItemNode {
  id_menu: number;
  descripcion: string;
  orden: number;
  icono: string | null;
  path: string | null;
  id_permiso: number | null;
}

export interface SessionMenuGroupNode {
  id_padre_menu: number;
  descripcion: string;
  items: SessionMenuItemNode[];
}

export interface SessionPermisoDto {
  id_permiso: number;
  codigo: string;
  descripcion: string | null;
}

export interface SessionRolDto {
  id_rol: number;
  codigo: string;
  descripcion: string;
}

export interface SessionUserDto {

  username: string;
  id_usuario: number;
}

export interface SessionData {
  user: SessionUserDto;
  roles: SessionRolDto[];
  permisos: SessionPermisoDto[];
  menu: SessionMenuGroupNode[];
}

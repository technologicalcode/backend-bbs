export interface SessionMenuNode {
  id_menu: number;
  orden: number;
  nombre: string;
  icono: string | null;
  path: string | null;
  id_permiso: number | null;
  hijos: SessionMenuNode[];
}

export interface SessionPermisoDto {
  id_permiso: number;
  codigo: string;
  nombre: string | null;
}

export interface SessionRolDto {
  id_rol: number;
  codigo: string;
  nombre: string;
}

export interface SessionUserDto {
  id_usuario_credencial: number;
  username: string;
  id_usuario: number;
}

export interface SessionData {
  user: SessionUserDto;
  roles: SessionRolDto[];
  permisos: SessionPermisoDto[];
  menu: SessionMenuNode[];
}

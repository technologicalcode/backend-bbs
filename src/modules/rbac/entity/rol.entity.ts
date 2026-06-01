import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolPermisoEntity } from './rol-permiso.entity';
import { UsuarioRolEntity } from './usuario-rol.entity';

@Entity('rol')
export class RolEntity {
  @PrimaryGeneratedColumn({ name: 'id_rol' })
  id_rol: number;

  @Column({ name: 'codigo', type: 'varchar', unique: true })
  codigo: string;

  @Column({ name: 'descripcion', type: 'varchar' })
  descripcion: string;

  @OneToMany(() => RolPermisoEntity, (rp) => rp.rol)
  rol_permisos: RolPermisoEntity[];

  @OneToMany(() => UsuarioRolEntity, (ur) => ur.rol)
  usuario_roles: UsuarioRolEntity[];
}

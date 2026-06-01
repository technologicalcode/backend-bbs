import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolPermisoEntity } from './rol-permiso.entity';
import { MenuEntity } from './menu.entity';

@Entity('permiso')
export class PermisoEntity {
  @PrimaryGeneratedColumn({ name: 'id_permiso' })
  id_permiso: number;

  @Column({ name: 'codigo', type: 'varchar', unique: true })
  codigo: string;

  @Column({ name: 'descripcion', type: 'varchar', nullable: true })
  descripcion: string | null;

  @Column({ name: 'modulo', type: 'varchar', nullable: true })
  modulo: string | null;

  @OneToMany(() => RolPermisoEntity, (rp) => rp.permiso)
  rol_permisos: RolPermisoEntity[];

  @OneToMany(() => MenuEntity, (m) => m.permiso)
  menu: MenuEntity[];
}

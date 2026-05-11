import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolPermisoEntity } from './rol-permiso.entity';
import { MenuItemEntity } from './menu-item.entity';

@Entity('permiso')
export class PermisoEntity {
  @PrimaryGeneratedColumn({ name: 'id_permiso' })
  id_permiso: number;

  @Column({ name: 'codigo', type: 'varchar', unique: true })
  codigo: string;

  @Column({ name: 'nombre', type: 'varchar', nullable: true })
  nombre: string | null;

  @OneToMany(() => RolPermisoEntity, (rp) => rp.permiso)
  rol_permisos: RolPermisoEntity[];

  @OneToMany(() => MenuItemEntity, (m) => m.permiso)
  menu_items: MenuItemEntity[];
}

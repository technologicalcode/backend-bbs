import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermisoEntity } from './permiso.entity';

@Entity('menu')
export class MenuItemEntity {
  @PrimaryGeneratedColumn({ name: 'id_menu' })
  id_menu: number;

  @Column({ name: 'orden', default: 0 })
  orden: number;

  @Column({ name: 'nombre', type: 'varchar' })
  nombre: string;

  @Column({ name: 'icono', type: 'varchar', nullable: true })
  icono: string | null;

  @Column({ name: 'path', type: 'varchar', nullable: true })
  path: string | null;

  @ManyToOne(() => PermisoEntity, (p) => p.menu_items, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_permiso' })
  permiso: PermisoEntity | null;

  @ManyToOne(() => MenuItemEntity, (m) => m.hijos, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_padre' })
  padre: MenuItemEntity | null;

  @OneToMany(() => MenuItemEntity, (m) => m.padre)
  hijos: MenuItemEntity[];
}

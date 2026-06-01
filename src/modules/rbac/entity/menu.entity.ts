import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermisoEntity } from './permiso.entity';
import { PadreMenuEntity } from './padre_menu.entity';

@Entity('menu')
export class MenuEntity {
  @PrimaryGeneratedColumn({ name: 'id_menu' })
  id_menu: number;

  @ManyToOne(() => PadreMenuEntity, (p) => p.menus, { nullable: true })
  @JoinColumn({ name: 'id_padre_menu' })
  padre_menu: PadreMenuEntity | null;

  @Column({ name: 'descripcion', type: 'varchar' })
  descripcion: string;

  @Column({ name: 'icono', type: 'varchar', nullable: true })
  icono: string | null;

  @Column({ name: 'path', type: 'varchar', nullable: true })
  path: string | null;

  @Column({ name: 'orden', default: 1 })
  orden: number;

  @ManyToOne(() => PermisoEntity, (p) => p.menu, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_permiso' })
  permiso: PermisoEntity | null;

  @Column({ name: 'estado', type: 'int2', default: 1 })
  estado: number;
}

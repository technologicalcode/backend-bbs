import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RolEntity } from './rol.entity';
import { PermisoEntity } from './permiso.entity';

@Unique(['rol', 'permiso'])
@Entity('rol_permiso')
export class RolPermisoEntity {
  @PrimaryGeneratedColumn({ name: 'id_rol_permiso' })
  id_rol_permiso: number;

  @ManyToOne(() => RolEntity, (r) => r.rol_permisos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_rol' })
  rol: RolEntity;

  @ManyToOne(() => PermisoEntity, (p) => p.rol_permisos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_permiso' })
  permiso: PermisoEntity;
}

import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UsuariosEntity } from '../../usuarios/entity/usuarios.entity';
import { RolEntity } from './rol.entity';

@Unique(['usuario', 'rol'])
@Entity('usuario_rol')
export class UsuarioRolEntity {
  @PrimaryGeneratedColumn({ name: 'id_usuario_rol' })
  id_usuario_rol: number;

  @ManyToOne(() => UsuariosEntity, (u) => u.usuario_roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuariosEntity;

  @ManyToOne(() => RolEntity, (r) => r.usuario_roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_rol' })
  rol: RolEntity;
}

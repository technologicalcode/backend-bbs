import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '../../../auth/user/entity/user.entity';
import { RolEntity } from './rol.entity';

@Unique(['usuario', 'rol'])
@Entity('usuario_rol')
export class UsuarioRolEntity {
  @PrimaryGeneratedColumn({ name: 'id_usuario_rol' })
  id_usuario_rol: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id_user' })
  usuario: UserEntity;

  @ManyToOne(() => RolEntity, (r) => r.usuario_roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_rol' })
  rol: RolEntity;
}

import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UsuarioCredencialesEntity } from '../../usuarios/entity/usuario-credenciales.entity';
import { RolEntity } from './rol.entity';

@Unique(['usuario', 'rol'])
@Entity('usuario_rol')
export class UsuarioRolEntity {
  @PrimaryGeneratedColumn({ name: 'id_usuario_rol' })
  id_usuario_rol: number;

  @ManyToOne(() => UsuarioCredencialesEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id_user',
    referencedColumnName: 'id_usuario_credencial',
  })
  usuario: UsuarioCredencialesEntity;

  @ManyToOne(() => RolEntity, (r) => r.usuario_roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_rol' })
  rol: RolEntity;
}

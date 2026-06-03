import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NegocioEntity } from '../../negocio/entity/negocio.entity';
import { TipoUsuariosEntity } from './tipo-usuarios.entity';
import { UsuarioCredencialesEntity } from './usuario-credenciales.entity';
import { UsuarioRolEntity } from '../../rbac/entity/usuario-rol.entity';

@Entity('usuarios')
export class UsuariosEntity {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'apellido' })
  apellido: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'telefono' })
  telefono: string;

  @Column({ name: 'estado', type: 'int2', default: 1 })
  estado: number;

  @ManyToOne(() => TipoUsuariosEntity, (t) => t.usuarios)
  @JoinColumn({ name: 'id_tipo_usuario' })
  tipo_usuario: TipoUsuariosEntity;

  @ManyToOne(() => NegocioEntity, (n) => n.usuarios)
  @JoinColumn({ name: 'id_negocio' })
  negocio: NegocioEntity;

  @OneToMany(() => UsuarioCredencialesEntity, (c) => c.usuario)
  credenciales: UsuarioCredencialesEntity[];

  @OneToMany(() => UsuarioRolEntity, (ur) => ur.usuario)
  usuario_roles: UsuarioRolEntity[];

  @OneToMany(() => UsuariosEntity, (u) => u.id_usuario)
  usuarios: UsuariosEntity[];
}

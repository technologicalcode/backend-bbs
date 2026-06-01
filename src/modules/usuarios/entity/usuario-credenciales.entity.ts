import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsuariosEntity } from './usuarios.entity';

@Entity('usuario_credenciales')
export class UsuarioCredencialesEntity {
  @PrimaryGeneratedColumn({ name: 'id_usuario_credencial' })
  id_usuario_credencial: number;

  @Column({ name: 'id_usuario' })
  id_usuario: number;

  @ManyToOne(() => UsuariosEntity, (u) => u.credenciales, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuariosEntity;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ name: 'estado', type: 'int2', default: 1 })
  estado: number;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuariosEntity } from './usuarios.entity';

@Entity('tipo_usuarios')
export class TipoUsuariosEntity {
  @PrimaryGeneratedColumn({ name: 'id_tipo_usuario' })
  id_tipo_usuario: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'estado', type: 'int2', default: 1 })
  estado: number;

  @OneToMany(() => UsuariosEntity, (u) => u.tipo_usuario)
  usuarios: UsuariosEntity[];
}

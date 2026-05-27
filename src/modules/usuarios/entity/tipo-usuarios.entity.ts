import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo_usuarios')
export class TipoUsuariosEntity {
  @PrimaryGeneratedColumn({ name: 'id_tipo_usuario' })
  id_tipo_usuario: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'estado_tipo_usuario', type: 'int2', default: 1 })
  estado_tipo_usuario: number;
}
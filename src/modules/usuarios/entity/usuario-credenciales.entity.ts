import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario_credenciales')
export class UsuarioCredencialesEntity {
  @PrimaryGeneratedColumn({ name: 'id_usuario_credencial' })
  id_usuario_credencial: number;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'estado_usuario_credencial', type: 'int2', default: 1 })
  estado_usuario_credencial: number;
}
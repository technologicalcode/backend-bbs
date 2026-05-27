import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ name: 'id_tipo_usuario' })
  id_tipo_usuario: number;

  @Column({ name: 'estado_usuario', type: 'int2', default: 1 })
  estado_usuario: number;

  @Column({ name: 'id_negocio' })
  id_negocio: number;

}
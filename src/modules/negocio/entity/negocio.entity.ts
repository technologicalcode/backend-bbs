import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('negocio')
export class NegocioEntity {
  @PrimaryGeneratedColumn({ name: 'id_negocio' })
  id_negocio: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'ruc' })
  ruc:string;

  @Column({ name: 'direccion' })
  direccion:string;

  @Column({ name: 'telefono' })
  telefono:string;

  @Column({ name: 'correo' })
  correo:string;

  @Column({ name: 'estado_negocio', type: 'int2', default: 1 })
  estado_negocio: number;

  @Column({name:'encargado_negocio'})
  encargado_negocio:number; // id_usuario

  @Column({ name: 'id_tipo_negocio' })
  id_tipo_negocio: number;

}
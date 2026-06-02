import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('clientes')
export class ClienteEntity {
  @PrimaryGeneratedColumn({ name: 'idcliente' })
  id_cliente: number;

  @Column({ name: 'nombres' })
  nombres: string;

  @Column({ name: 'apellido' })
  apellido: string;

  @Column({ name: 'telefono' })
  telefono: string;

  @Column({ name: 'num_documento' })
  num_documento: string;

  @Column({ name: 'estado_cl',type: 'int2' })
  estado_cl: number;

  @OneToMany(()=>ClienteEntity, (c)=>c.id_cliente)
  clientes: ClienteEntity[];

}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ name: 'estado_cl' })
  estado_cl: string;
}

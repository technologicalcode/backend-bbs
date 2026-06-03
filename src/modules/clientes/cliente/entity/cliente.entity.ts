import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConversacionWspEntity } from 'src/modules/WhatsApp/entity/conversacion_wsp.entity';
import { CitasEntity } from 'src/modules/citas/entity/citas.entity';

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

  @Column({ name: 'estado_cl', type: 'int2' })
  estado_cl: number;

  @OneToMany(() => ConversacionWspEntity, (c) => c.cliente)
  conversaciones_wsp: ConversacionWspEntity[];

  @OneToMany(() => CitasEntity, (c) => c.cliente)
  citas: CitasEntity[];
}

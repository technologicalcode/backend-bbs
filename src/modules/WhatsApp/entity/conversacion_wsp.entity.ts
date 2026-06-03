import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClienteEntity } from '../../clientes/cliente/entity/cliente.entity';
import { NegocioEntity } from '../../negocio/entity/negocio.entity';

@Entity('conversacion_wsp')
export class ConversacionWspEntity {
  @PrimaryGeneratedColumn({ name: 'id_conversacion' })
  id_conversacion: number;

  @ManyToOne(() => ClienteEntity, (c) => c.conversaciones_wsp)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id_cliente' })
  cliente: ClienteEntity;

  @ManyToOne(() => NegocioEntity, (n) => n.conversaciones_wsp)
  @JoinColumn({ name: 'id_negocio' })
  negocio: NegocioEntity;

  @Column({ name: 'numero_wsp' })
  numero_wsp: string;

  @Column({ name: 'estado_conv_wsp', type: 'int2', default: 1 })
  estado_conv_wsp: number;

  @Column({ name: 'datos', type: 'jsonb', nullable: true })
  datos: Record<string, unknown> | null;

  @Column({ name: 'ultima_interaccion', type: 'timestamp' })
  ultima_interaccion: Date;
}

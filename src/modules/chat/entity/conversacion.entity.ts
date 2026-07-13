import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClienteEntity } from '../../clientes/cliente/entity/cliente.entity';
import { NegocioEntity } from '../../negocio/entity/negocio.entity';
import { CanalChat } from '../constants/canal-chat';

@Entity('conversacion_chat')
export class ConversacionEntity {
  @PrimaryGeneratedColumn({ name: 'id_conversacion' })
  id_conversacion: number;

  @ManyToOne(() => ClienteEntity, (c) => c.conversaciones)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id_cliente' })
  cliente: ClienteEntity;

  @ManyToOne(() => NegocioEntity, (n) => n.conversaciones)
  @JoinColumn({ name: 'id_negocio' })
  negocio: NegocioEntity;

  /** Teléfono, usuario o id externo según el canal. */
  @Column({ name: 'identificador_externo' })
  identificador_externo: string;

  @Column({ name: 'canal', type: 'varchar', length: 32, default: CanalChat.WHATSAPP })
  canal: CanalChat;

  @Column({ name: 'estado_conversacion', type: 'int2', default: 1 })
  estado_conversacion: number;

  @Column({ name: 'datos', type: 'jsonb', nullable: true })
  datos: Record<string, unknown> | null;

  @Column({ name: 'ultima_interaccion', type: 'timestamp' })
  ultima_interaccion: Date;
}

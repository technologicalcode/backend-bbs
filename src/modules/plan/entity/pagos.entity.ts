import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NegocioPlanEntity } from './negocio_plan.entity';

@Entity('pagos')
export class PagosEntity {
  @PrimaryGeneratedColumn({ name: 'id_pago' })
  id_pago: number;

  @Column({ name: 'id_negocio_plan' })
  id_negocio_plan: number;

  @Column({ name: 'monto', type: 'decimal', precision: 10, scale: 2 })
  monto: string;

  @Column({ name: 'fecha_pago', type: 'timestamp' })
  fecha_pago: Date;

  @Column({ name: 'metodo_pago', type: 'varchar' })
  metodo_pago: string;

  @Column({ name: 'referencia', type: 'varchar', nullable: true })
  referencia: string | null;

  @Column({ name: 'estado', type: 'int2', default: 1 })
  estado: number;

  @ManyToOne(() => NegocioPlanEntity, (np) => np.pagos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_negocio_plan' })
  negocio_plan: NegocioPlanEntity;
}

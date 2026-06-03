import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NegocioEntity } from '../../negocio/entity/negocio.entity';
import { PlanEntity } from './plan.entity';
import { PagosEntity } from './pagos.entity';

@Entity('negocio_plan')
export class NegocioPlanEntity {
  @PrimaryGeneratedColumn({ name: 'id_negocio_plan' })
  id_negocio_plan: number;

  @Column({ name: 'id_negocio' })
  id_negocio: number;

  @Column({ name: 'id_plan' })
  id_plan: number;

  @Column({ name: 'fecha_inicio', type: 'date' })
  fecha_inicio: Date;

  @Column({ name: 'fecha_vencimiento', type: 'date' })
  fecha_vencimiento: Date;

  @Column({ name: 'estado', type: 'int2', default: 1 })
  estado: number;

  @ManyToOne(() => NegocioEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_negocio' })
  negocio: NegocioEntity;

  @ManyToOne(() => PlanEntity, (p) => p.negocio_planes, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_plan' })
  plan: PlanEntity;

  @OneToMany(() => PagosEntity, (p) => p.negocio_plan)
  pagos: PagosEntity[];
}

import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PermisoEntity } from '../../rbac/entity/permiso.entity';
import { PlanEntity } from './plan.entity';

@Unique(['plan', 'permiso'])
@Entity('plan_permiso')
export class PlanPermisoEntity {
  @PrimaryGeneratedColumn({ name: 'id_plan_permiso' })
  id_plan_permiso: number;

  @ManyToOne(() => PlanEntity, (p) => p.plan_permisos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_plan' })
  plan: PlanEntity;

  @ManyToOne(() => PermisoEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_permiso' })
  permiso: PermisoEntity;
}

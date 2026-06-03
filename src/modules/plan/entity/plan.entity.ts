import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NegocioPlanEntity } from './negocio_plan.entity';
import { PlanPermisoEntity } from './plan_permiso.entity';

@Entity('plan')
export class PlanEntity {
  @PrimaryGeneratedColumn({ name: 'id_plan' })
  id_plan: number;

  @Column({ name: 'codigo', type: 'varchar', unique: true })
  codigo: string;

  @Column({ name: 'nombre', type: 'varchar' })
  nombre: string;

  @Column({ name: 'max_dias_horarios', type: 'int' })
  max_dias_horarios: number;

  @Column({ name: 'max_citas_mes', type: 'int' })
  max_citas_mes: number;

  @Column({ name: 'max_usuarios', type: 'int' })
  max_usuarios: number;

  @Column({ name: 'canal_whatsapp', type: 'boolean', default: false })
  canal_whatsapp: boolean;

  @Column({ name: 'reportes', type: 'boolean', default: false })
  reportes: boolean;

  @Column({ name: 'multi_usuario', type: 'boolean', default: false })
  multi_usuario: boolean;

  @Column({ name: 'precio_mensual', type: 'decimal', precision: 10, scale: 2 })
  precio_mensual: string;

  @Column({ name: 'estado', type: 'int2', default: 1 })
  estado: number;

  @OneToMany(() => NegocioPlanEntity, (np) => np.plan)
  negocio_planes: NegocioPlanEntity[];

  @OneToMany(() => PlanPermisoEntity, (pp) => pp.plan)
  plan_permisos: PlanPermisoEntity[];
}

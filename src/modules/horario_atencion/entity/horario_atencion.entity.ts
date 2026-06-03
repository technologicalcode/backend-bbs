import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BloqueosHorarioEntity } from './bloqueos_horario.entity';

@Entity('horarios_atencion')
export class HorarioAtencionEntity {
  @PrimaryGeneratedColumn({ name: 'id_horario_atencion' })
  id_horario_atencion: number;

  @Column({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'hora_inicio', type: 'time', nullable: true })
  hora_inicio: string | null;

  @Column({ name: 'hora_fin', type: 'time', nullable: true })
  hora_fin: string | null;

  @Column({ name: 'fecha', type: 'date' })
  fecha: Date;

  @Column({ name: 'estado_ha', type: 'int2', default: 1 })
  estado_ha: number;

  @Column({ name: 'horas_ausencia_inicio', type: 'time', nullable: true })
  horas_ausencia_inicio: string | null;

  @Column({ name: 'horas_ausencia_fin', type: 'time', nullable: true })
  horas_ausencia_fin: string | null;

  @Column({ name: 'tiempo_proceso', type: 'time', nullable: true })
  tiempo_proceso: string | null;

  @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at', type: 'timestamp' })
  updateAt: Date;

  @OneToMany(() => BloqueosHorarioEntity, (b) => b.horario_atencion)
  bloqueos: BloqueosHorarioEntity[];
}

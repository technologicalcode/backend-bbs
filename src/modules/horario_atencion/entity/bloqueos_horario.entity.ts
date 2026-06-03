import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HorarioAtencionEntity } from './horario_atencion.entity';

@Entity('bloqueos_horario')
export class BloqueosHorarioEntity {
  @PrimaryGeneratedColumn({ name: 'id_bloqueo' })
  id_bloqueo: number;

  @Column({ name: 'id_horario_atencion' })
  id_horario_atencion: number;

  @Column({ name: 'hora_inicio', type: 'time' })
  hora_inicio: string;

  @Column({ name: 'hora_fin', type: 'time' })
  hora_fin: string;

  @Column({ name: 'motivo', type: 'varchar', nullable: true })
  motivo: string | null;

  @ManyToOne(() => HorarioAtencionEntity, (h) => h.bloqueos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_horario_atencion' })
  horario_atencion: HorarioAtencionEntity;
}

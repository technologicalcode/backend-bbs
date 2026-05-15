import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('horarios_atencion')
export class HorarioAtencionEntity {
  @PrimaryGeneratedColumn({ name: 'id_horario_atencion' })
  id_horario_atencion: number;

  @Column({ name: 'id_bb' })
  id_bb: number;

  @Column({ name: 'hora_inicio', type: 'time' })
  hora_inicio: string;

  @Column({ name: 'hora_fin', type: 'time' })
  hora_fin: string;

  @Column({ name: 'fecha', type: 'date' })
  fecha: Date;

  @Column({ name: 'estado_ha' })
  estado_ha: string;

  @Column({ name: 'horas_ausencia_inicio', type: 'time', nullable: true })
  horas_ausencia_inicio: string | null;

  @Column({ name: 'horas_ausencia_fin', type: 'time', nullable: true })
  horas_ausencia_fin: string | null;
}

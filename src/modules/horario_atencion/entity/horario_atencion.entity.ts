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

  @Column({ name: 'duracion_slot', type: 'int', default: 30 })
  duracion_slot: number;

  @Column({ name: 'tiempo_libre', type: 'int', default: 0 })
  tiempo_libre: number;

  @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at', type: 'timestamp' })
  updateAt: Date;

  @OneToMany(() => BloqueosHorarioEntity, (b) => b.horario_atencion)
  bloqueos: BloqueosHorarioEntity[];
}

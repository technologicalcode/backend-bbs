import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BloqueosHorarioEntity } from './bloqueos_horario.entity';
import { NegocioEntity } from 'src/modules/negocio/entity/negocio.entity';

@Entity('horarios_atencion')
export class HorarioAtencionEntity {
  @PrimaryGeneratedColumn({ name: 'id_horario_atencion' })
  id_horario_atencion: number;

  @Column({ name: 'id_negocio', type: 'int' })
  id_negocio: number;

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

  @Column({ name: 'tiempo_entre_slot', type: 'int', default: 0 })
  tiempo_entre_slot: number;

  @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at', type: 'timestamp' })
  updateAt: Date;

  @OneToMany(() => BloqueosHorarioEntity, (b) => b.horario_atencion)
  bloqueos: BloqueosHorarioEntity[];

  @ManyToOne(() => NegocioEntity, (n) => n.horarios)
  @JoinColumn({ name: 'id_negocio' })
  negocio: NegocioEntity;
}

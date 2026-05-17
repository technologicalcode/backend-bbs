import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('citas')
export class CitasEntity {
  @PrimaryGeneratedColumn({ name: 'id_cita' })
  id_cita: number;

  @Column({ name: 'id_cliente', type: 'int', nullable: true })
  id_cliente: number | null;

  @Column({ name: 'id_bb' })
  id_bb: number;

  @Column({ name: 'hora_cita_inicio', type: 'time' })
  hora_cita_inicio: string;

  @Column({ name: 'hora_cita_fin', type: 'time' })
  hora_cita_fin: string;

  @Column({ name: 'fecha_cita', type: 'date' })
  fecha_cita: Date;

  @Column({ name: 'estado_cita' })
  estado_cita: string;
}

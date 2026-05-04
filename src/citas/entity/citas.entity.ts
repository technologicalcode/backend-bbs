import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('citas')
export class CitasEntity {
  @PrimaryGeneratedColumn({ name: 'id_cita' })
  id_cita: number;

  @Column({ name: 'id_cliente' })
  id_cliente: number;

  @Column({ name: 'id_bb' })
  id_bb: number;

  @Column({ name: 'hora_cita', type: 'time' })
  hora_cita: string;

  @Column({ name: 'fecha_cita', type: 'date' })
  fecha_cita: Date;

  @Column({ name: 'estado_cita' })
  estado_cita: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('barbero')
export class BarberoEntity {
  @PrimaryGeneratedColumn({ name: 'id_bb' })
  id_bb: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'apellido' })
  apellido: string;

  @Column({ name: 'dni' })
  dni: string;

  @Column({ name: 'alias' })
  alias: string;

  @Column({ name: 'id_bbs', nullable: true })
  id_bbs: number;
}

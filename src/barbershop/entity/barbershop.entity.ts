import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('barbershop')
export class BarbershopEntity {
  @PrimaryGeneratedColumn({ name: 'id_bbs' })
  id_bbs: number;

  @Column({ name: 'razon_social' })
  razon_social: string;

  @Column({ name: 'ubicacion' })
  ubicacion: string;

  @Column({ name: 'ruc' })
  ruc: string;

  @Column({ name: 'cel_contacto' })
  cel_contacto: string;

  @Column({ name: 'correo' })
  correo: string;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ServicioNegocioEntity } from './servicio_negocio.entity';


@Entity('servicios')
export class ServiciosEntity {

    @PrimaryGeneratedColumn({ name: 'id_servicio', type: 'int8' })
    id_servicio: number;

    @Column({ name: 'nombre', type: 'varchar' })
    nombre: string

    @Column({ name: 'descripcion', type: 'text' })
    descripcion: string

    @OneToMany(() => ServicioNegocioEntity, (s) => s.servicio)
    servicio_negocio: ServicioNegocioEntity[]

}
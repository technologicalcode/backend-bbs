import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ServiciosEntity } from './servicios.entity';
import { NegocioEntity } from '../../negocio/entity/negocio.entity';


@Entity('servicio_negocio')
export class ServicioNegocioEntity {
    @PrimaryGeneratedColumn({ name: 'id_servicio_negocio', type: 'int8' })
    id_servicio_negocio: number;

    @Column({ name: 'id_servicio', type: 'int8' })
    id_servicio: number;

    @Column({name: 'id_negocio', type: 'int8'})
    id_negocio: number;

    @Column({name: 'precio', type : 'money'})
    precio: string

    @Column({name: 'duracion', type:'int8'})
    duracion: number

    @Column({name: 'estado_servicio_negocio', type: 'int2', default: 1})
    estado_servicio_negocio: number


    @ManyToOne(()=>ServiciosEntity, (s)=>s.servicio_negocio)
    @JoinColumn({name:'id_servicio'})
    servicio: ServiciosEntity

    @ManyToOne(()=>NegocioEntity,(n)=>n.servicios)
    
    @JoinColumn({name: 'id_negocio'})
    negocio: NegocioEntity


}
import { ClienteEntity } from 'src/modules/clientes/cliente/entity/cliente.entity';
import { NegocioEntity } from 'src/modules/negocio/entity/negocio.entity';
import { UsuariosEntity } from 'src/modules/usuarios/entity/usuarios.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity('citas')
export class CitasEntity {
  @PrimaryGeneratedColumn({ name: 'id_cita' })
  id_cita: number;

  @Column({ name: 'id_cliente', type: 'int', nullable: true })
  id_cliente: number | null;

  @Column({ name: 'id_negocio', type: 'int', nullable: true })
  id_negocio: number | null;

  @Column({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'hora_cita_inicio', type: 'time' })
  hora_cita_inicio: string;

  @Column({ name: 'hora_cita_fin', type: 'time' })
  hora_cita_fin: string;

  @Column({ name: 'fecha_cita', type: 'date' })
  fecha_cita: Date;

  /**
   * Estado de la cita:
   * 1 = disponible
   * 2 = ocupado (ya no está disponible)
   */
  @Column({ name: 'estado_cita', type: 'int2', default: 1 })
  estado_cita: number;

  @ManyToOne(() => ClienteEntity, (c) => c.citas, { nullable: true })
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id_cliente' })
  cliente: ClienteEntity;

  @ManyToOne(()=>NegocioEntity, (n)=>n.id_negocio)
  @JoinColumn({ name: 'id_negocio' })
  negocio: NegocioEntity;

  @ManyToOne(()=>UsuariosEntity, (u)=>u.id_usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuariosEntity;
}

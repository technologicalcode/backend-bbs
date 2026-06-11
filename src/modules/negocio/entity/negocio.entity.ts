import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoNegocioEntity } from './tipo-negocio.entity';
import { UsuariosEntity } from '../../usuarios/entity/usuarios.entity';
import { ConversacionWspEntity } from '../../WhatsApp/entity/conversacion_wsp.entity';
import { HorarioAtencionEntity } from 'src/modules/horario_atencion/entity/horario_atencion.entity';

@Entity('negocio')
export class NegocioEntity {
  @PrimaryGeneratedColumn({ name: 'id_negocio' })
  id_negocio: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'ruc' })
  ruc: string;

  @Column({ name: 'direccion' })
  direccion: string;

  @Column({ name: 'telefono' })
  telefono: string;

  @Column({ name: 'correo' })
  correo: string;

  @Column({ name: 'estado_negocio', type: 'int2', default: 1 })
  estado_negocio: number;

  @Column({ name: 'encargado_negocio' })
  encargado_negocio: number;

  @Column({ name: 'id_tipo_negocio' })
  id_tipo_negocio: number;

   @Column({name:'es_independiente', type: 'int2', default: 0})
   es_independiente: number;

  @ManyToOne(() => TipoNegocioEntity, (t) => t.negocios)
  @JoinColumn({ name: 'id_tipo_negocio' })
  tipo_negocio: TipoNegocioEntity;

  @OneToMany(() => UsuariosEntity, (u) => u.negocio)
  usuarios: UsuariosEntity[];

  @OneToMany(() => ConversacionWspEntity, (c) => c.negocio)
  conversaciones_wsp: ConversacionWspEntity[];

  @OneToMany(() => HorarioAtencionEntity, (h) => h.negocio)
  horarios: HorarioAtencionEntity[];
}

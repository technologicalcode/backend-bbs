import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NegocioEntity } from '../../entity/negocio.entity';

@Entity('tipo_negocio')
export class TipoNegocioEntity {
  @PrimaryGeneratedColumn({ name: 'id_tipo_negocio' })
  id_tipo_negocio: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'estado_tipo_negocio', type: 'int2', default: 1 })
  estado_tipo_negocio: number;

  @OneToMany(() => NegocioEntity, (n) => n.tipo_negocio)
  negocios: NegocioEntity[];
}

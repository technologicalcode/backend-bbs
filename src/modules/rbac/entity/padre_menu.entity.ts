import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MenuEntity } from "./menu.entity";


@Entity('padre_menu')
export class PadreMenuEntity {
  @PrimaryGeneratedColumn({ name: 'id_padre_menu' })
  id_padre_menu: number;

  @Column({ name: 'descripcion', type: 'varchar' })
  descripcion: string;

  @Column({name:'estado', type:'int2', default:1})
  estado: number;

  @OneToMany(()=>MenuEntity, (m)=>m.padre_menu)
  menus: MenuEntity[];
}
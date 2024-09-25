import { Entity, Property, ManyToOne, Collection, Cascade, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Consultorio } from "./consultorio.entity.js";

@Entity()
export class Secretaria extends BaseEntity{

  @Property({ nullable:false })
  nombre!: string

  @Property({ nullable:false })
  apellido!: string

  @Property({ nullable:false, unique: true })
  mail!: string //Hay que ver la validacion del mail

  @Property({ nullable:false })
  contraseña!: string  // Asergurar la contraseña para mas seguridad 'hash'

  @Property({ nullable:false })
  telefono!: number

  @Property({ nullable:false, unique: true })
  dni!: number

  @ManyToOne(() => Consultorio, {nullable: false })
  consultorio!: Rel<Consultorio>
}
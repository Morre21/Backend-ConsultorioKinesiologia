import { Entity, Property, ManyToOne, Collection, Cascade, Rel, OneToMany } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Turno } from "../turnos/turno.entity.js";
import { Precio } from "../precio/precio.entity.js";

@Entity()
export class TipoAtencion extends BaseEntity{
  @Property({ nullable:false })
  nombre !: string
  @Property({ nullable:false })
  estado !: boolean
  @OneToMany(() => Turno, (turno) => turno.tipoatencion, {
    cascade: [Cascade.ALL],
  })
  Turnos = new Collection<Turno>(this)
  
  @OneToMany(() => Precio, (precio) => precio.tipoatencion, {
    cascade: [Cascade.ALL],
  })
  Precios = new Collection<Precio>(this)
}
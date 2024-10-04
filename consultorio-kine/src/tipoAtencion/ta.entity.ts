import { Entity, Property, Collection, Cascade,  OneToMany, Rel, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Turno } from "../turnos/turno.entity.js";
import { Precio } from "../precio/precio.entity.js";
import { Disponibilidad } from "../disponibilidad/dispo.enitity.js";

@Entity()
export class TipoAtencion extends BaseEntity{
  @Property({ nullable:false })
  nombre !: string
  @Property({ nullable:false })
  estado !: boolean
  @OneToMany(() => Turno, (turno) => turno.tipoAtencion, {
    cascade: [Cascade.ALL],
  })
  Turnos = new Collection<Turno>(this)
  
  @ManyToOne(() => Precio, { nullable: false })
  precio !: Rel<Precio>

  @OneToMany(() => Disponibilidad, (dispo) => dispo.tipoAtencion, {
    cascade: [Cascade.ALL],
  })
  Disponibilidades = new Collection<Disponibilidad>(this)
}
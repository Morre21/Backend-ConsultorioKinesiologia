import { Entity, Property, OneToMany,  Cascade,  Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { TipoAtencion } from "../tipoAtencion/ta.entity.js";

@Entity()
export class Precio extends BaseEntity{
  @Property({ nullable:false })
  fechaDesde !: Date
  @Property({ nullable:false })
  importe !: number
  @OneToMany(() => TipoAtencion, (ta) => ta.precio, {
    cascade: [Cascade.ALL],
  })
  tiposAtencion = new Collection<TipoAtencion>(this)
}

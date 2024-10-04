import { Entity, Property, ManyToOne, PrimaryKey, Cascade, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { TipoAtencion } from "../tipoAtencion/ta.entity.js";

@Entity()
export class Precio extends BaseEntity{
  @PrimaryKey()
  @Property({ nullable:false })
  fechaDesde !: Date
  @Property({ nullable:false })
  importe !: number
  @ManyToOne(() => TipoAtencion, {nullable: false, cascade: [Cascade.REMOVE] })
  tipoAtencion !: Rel<TipoAtencion>
}

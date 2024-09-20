import { Entity, Property, ManyToOne, PrimaryKey, cascade, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { TipoAtencion } from "../tipoAtencion/ta.entity.js";

@Entity()
export class Precio extends BaseEntity{
  @Primarykey()
  @Property({ nullable:false })
  fechaDesde !: Date
  @Property({ nullable:false })
  importe !: number
  @ManyToOne(() => TipoAtencion, {nullable: false, cascade: ['remove'] })
  tipoAtencion !: Rel<TipoAtencion>
}
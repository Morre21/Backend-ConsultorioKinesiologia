import { Entity, Property, ManyToOne, Collection, Cascade, Rel, OneToMany } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Kinesiologo } from "../kinesiologo/kinesiologo.entity.js";

@Entity()
export class Especialidad extends BaseEntity{
  @Property({ nullable:false })
  nombre !: string
  @OneToMany(() => Kinesiologo, (kinesiologo) => kinesiologo.especialidad, {
    cascade: [Cascade.ALL],
  })
  kinesiologo = new Collection<Kinesiologo>(this)
}

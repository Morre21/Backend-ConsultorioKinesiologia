import {
  Entity,
  Property,
  ManyToOne,
  Rel,
  OneToMany,
  Collection,
  Cascade,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { TipoAtencion } from '../tipoAtencion/ta.entity.js'
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js'
import { Consultorio } from '../consultorio/consultorio.entity.js'
import { Turno } from '../turnos/turno.entity.js'

@Entity ()
export class Disponibilidad extends BaseEntity {
  @Property({nullable:false})
  dia !: string

  @Property({nullable:false})
  estado !: string

  @Property({nullable:false})
  fecha !: Date
  
  @Property({nullable:false})
  horaDesde !: string 

  @Property({nullable:false})
  horaHasta !: string

  @ManyToOne(() => TipoAtencion, {nullable:false})
  tipoAtencion !: Rel <TipoAtencion>

  @ManyToOne(() => Kinesiologo, {nullable:false})
  kinesiologo !: Rel <Kinesiologo>

  @ManyToOne(() => Consultorio, {nullable:false})
  consultorio !: Rel <Consultorio>

  @OneToMany(() => Turno, (turno) => turno.disponibilidad, {
    cascade: [Cascade.ALL],
  })
  Turnos = new Collection<Turno>(this)
}   
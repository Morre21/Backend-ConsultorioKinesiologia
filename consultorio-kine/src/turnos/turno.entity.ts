import {
    Entity,
    ManyToOne,
    Property,
    Rel
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js'
  import { Paciente } from '../paciente/paciente.entity.js'
  import { TipoAtencion } from '../tipoAtencion/ta.entity.js'
  import { Disponibilidad } from '../disponibilidad/dispo.enitity.js'

@Entity()
export class Turno extends BaseEntity {
        @Property({nullable: false}) 
        fecha!:string

        @Property({nullable: false}) 
        horaDesde!:string

        @Property({nullable: false}) 
        importeTotal!:number

        @Property({nullable: false})
        observaciones!:string

        @ManyToOne(() => Paciente, {nullable: false})
        paciente!: Rel<Paciente>

        @ManyToOne(() => Kinesiologo, {nullable: false})
        kinesiologo !: Rel<Kinesiologo>   
          
        @ManyToOne(() => TipoAtencion, {nullable: false})
        tipoAtencion !: Rel <TipoAtencion>

        @ManyToOne(() => Disponibilidad, {nullable: false})
        disponibilidad!: Rel<Disponibilidad>
    }


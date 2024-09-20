import {
    Entity,
    OneToMany,
    Property,
    Cascade,
    Collection,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js'
  import { Paciente } from '../paciente/paciente.entity.js'
  import { TipoAtencion } from '../tipoAtencion/ta.entity.js'

@Entity()
export class Turno{
    constructor(
        @Property({nullable: false}) 
        fecha:string, 

        @Property({nullable: false}) 
        hora:string,

        @Property({nullable: false}) 
        estado:string, 

        @Property({nullable: false}) 
        importeTotal:number, 

        @ManyToOne(() => Paciente, {nullable: false})
    )   {}

        @ManyToOne(() => Kinesiologo, {nullable: false})
    )   {}
          
        @ManyToOne(() => TipoAtencion, {nullable: false})
    )   {}
}

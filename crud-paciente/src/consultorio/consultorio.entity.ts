import {
    Entity,
    OneToMany,
    Property,
    Cascade,
    Collection,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { Secretaria } from '../secretaria/secretaria.entity.js'
  
  @Entity()
  export class Consultorio extends BaseEntity {
    @Property({ nullable: false })
    nombre!: string
  
    @Property({ nullable: false, unique: true })
    domicilio!: string
  
    @OneToMany(() => Secretaria, (secretaria) => secretaria.consultorio, {
      cascade: [Cascade.ALL],
    })
    Secretarias = new Collection<Secretaria>(this)
  }
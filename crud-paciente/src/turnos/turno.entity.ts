import {
    Entity,
    ManyToOne,
    Property,
    Cascade,
    Collection,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js'
  import { Paciente } from '../paciente/paciente.entity.js'
  import { TipoAtencion } from '../tipoAtencion/ta.entity.js'

@Entity()
export class Turno extends BaseEntity{
    @Property({nullable: false}) 
    fecha!: string; 

    @Property({nullable: false}) 
    hora!: string;

    @Property({nullable: false}) 
    estado!: string;

    @Property({nullable: false}) 
    importeTotal!: number; 

    @ManyToOne(() => Paciente, {nullable: false})
    paciente!: Paciente;

    @ManyToOne(() => Kinesiologo, {nullable: false})
    kinesiologo!: Kinesiologo;
          
    @ManyToOne(() => TipoAtencion, {nullable: false})
    tipoAtencion!: TipoAtencion;
    
    constructor(
        fecha: string,
        hora: string,
        estado: string,
        importeTotal: number,
        paciente: Paciente,
        kinesiologo: Kinesiologo,
        tipoAtencion: TipoAtencion,
    )   
    {
        super();
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
        this.importeTotal = importeTotal;
        this.paciente = paciente;
        this.kinesiologo = kinesiologo;
        this.tipoAtencion = tipoAtencion;
    }
}

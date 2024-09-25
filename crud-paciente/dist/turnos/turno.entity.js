var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, Property, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js';
import { Paciente } from '../paciente/paciente.entity.js';
import { TipoAtencion } from '../tipoAtencion/ta.entity.js';
export let Turno = class Turno extends BaseEntity {
    constructor(fecha, hora, estado, importeTotal, paciente, kinesiologo, tipoAtencion) {
        super();
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
        this.importeTotal = importeTotal;
        this.paciente = paciente;
        this.kinesiologo = kinesiologo;
        this.tipoAtencion = tipoAtencion;
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Turno.prototype, "fecha", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Turno.prototype, "hora", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Turno.prototype, "estado", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Turno.prototype, "importeTotal", void 0);
__decorate([
    ManyToOne(() => Paciente, { nullable: false }),
    __metadata("design:type", Paciente)
], Turno.prototype, "paciente", void 0);
__decorate([
    ManyToOne(() => Kinesiologo, { nullable: false }),
    __metadata("design:type", Kinesiologo)
], Turno.prototype, "kinesiologo", void 0);
__decorate([
    ManyToOne(() => TipoAtencion, { nullable: false }),
    __metadata("design:type", TipoAtencion)
], Turno.prototype, "tipoAtencion", void 0);
Turno = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String, String, String, Number, Paciente,
        Kinesiologo,
        TipoAtencion])
], Turno);
//# sourceMappingURL=turno.entity.js.map
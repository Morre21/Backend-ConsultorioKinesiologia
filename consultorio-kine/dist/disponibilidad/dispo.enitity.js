var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, OneToMany, Collection, Cascade, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { TipoAtencion } from '../tipoAtencion/ta.entity.js';
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js';
import { Consultorio } from '../consultorio/consultorio.entity.js';
import { Turno } from '../turnos/turno.entity.js';
export let Disponibilidad = class Disponibilidad extends BaseEntity {
    constructor() {
        super(...arguments);
        this.Turnos = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Disponibilidad.prototype, "dia", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Disponibilidad.prototype, "estado", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], Disponibilidad.prototype, "fecha", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Disponibilidad.prototype, "horaDesde", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Disponibilidad.prototype, "horaHasta", void 0);
__decorate([
    ManyToOne(() => TipoAtencion, { nullable: false }),
    __metadata("design:type", Object)
], Disponibilidad.prototype, "tipoAtencion", void 0);
__decorate([
    ManyToOne(() => Kinesiologo, { nullable: false }),
    __metadata("design:type", Object)
], Disponibilidad.prototype, "kinesiologo", void 0);
__decorate([
    ManyToOne(() => Consultorio, { nullable: false }),
    __metadata("design:type", Object)
], Disponibilidad.prototype, "consultorio", void 0);
__decorate([
    OneToMany(() => Turno, (turno) => turno.disponibilidad, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], Disponibilidad.prototype, "Turnos", void 0);
Disponibilidad = __decorate([
    Entity()
], Disponibilidad);
//# sourceMappingURL=dispo.enitity.js.map
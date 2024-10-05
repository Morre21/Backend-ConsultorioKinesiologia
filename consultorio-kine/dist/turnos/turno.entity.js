var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js';
import { Paciente } from '../paciente/paciente.entity.js';
import { TipoAtencion } from '../tipoAtencion/ta.entity.js';
import { Disponibilidad } from '../disponibilidad/dispo.enitity.js';
export let Turno = class Turno extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Turno.prototype, "fecha", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Turno.prototype, "horaDesde", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Turno.prototype, "importeTotal", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Turno.prototype, "observaciones", void 0);
__decorate([
    ManyToOne(() => Paciente, { nullable: false }),
    __metadata("design:type", Object)
], Turno.prototype, "paciente", void 0);
__decorate([
    ManyToOne(() => Kinesiologo, { nullable: false }),
    __metadata("design:type", Object)
], Turno.prototype, "kinesiologo", void 0);
__decorate([
    ManyToOne(() => TipoAtencion, { nullable: false }),
    __metadata("design:type", Object)
], Turno.prototype, "tipoAtencion", void 0);
__decorate([
    ManyToOne(() => Disponibilidad, { nullable: false }),
    __metadata("design:type", Object)
], Turno.prototype, "disponibilidad", void 0);
Turno = __decorate([
    Entity()
], Turno);
//# sourceMappingURL=turno.entity.js.map
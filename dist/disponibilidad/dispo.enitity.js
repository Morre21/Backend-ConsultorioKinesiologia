var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js';
export let Disponibilidad = class Disponibilidad extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], Disponibilidad.prototype, "fechaDesde", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Disponibilidad.prototype, "diaSemana", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Disponibilidad.prototype, "horaInicio", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Disponibilidad.prototype, "horaFin", void 0);
__decorate([
    ManyToOne(() => Kinesiologo, { nullable: false }),
    __metadata("design:type", Object)
], Disponibilidad.prototype, "kinesiologo", void 0);
Disponibilidad = __decorate([
    Entity()
], Disponibilidad);
//# sourceMappingURL=dispo.enitity.js.map
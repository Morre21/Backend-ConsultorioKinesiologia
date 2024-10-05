var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, Collection, Cascade, OneToMany } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Especialidad } from "../especialidad/especialidad.entity.js";
import { Consultorio } from '../consultorio/consultorio.entity.js';
import { Turno } from '../turnos/turno.entity.js';
import { Disponibilidad } from "../disponibilidad/dispo.enitity.js";
export let Kinesiologo = class Kinesiologo extends BaseEntity {
    constructor() {
        super(...arguments);
        this.Turnos = new Collection(this);
        this.Disponibilidades = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Kinesiologo.prototype, "matricula", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Kinesiologo.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Kinesiologo.prototype, "apellido", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Kinesiologo.prototype, "mail", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Kinesiologo.prototype, "contrase\u00F1a", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Kinesiologo.prototype, "telefono", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Kinesiologo.prototype, "dni", void 0);
__decorate([
    ManyToOne(() => Especialidad, { nullable: false }),
    __metadata("design:type", Object)
], Kinesiologo.prototype, "especialidad", void 0);
__decorate([
    ManyToOne(() => Consultorio, { nullable: false }),
    __metadata("design:type", Object)
], Kinesiologo.prototype, "consultorio", void 0);
__decorate([
    OneToMany(() => Turno, (turno) => turno.kinesiologo, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], Kinesiologo.prototype, "Turnos", void 0);
__decorate([
    OneToMany(() => Disponibilidad, (dispo) => dispo.kinesiologo, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], Kinesiologo.prototype, "Disponibilidades", void 0);
Kinesiologo = __decorate([
    Entity()
], Kinesiologo);
//# sourceMappingURL=kinesiologo.entity.js.map
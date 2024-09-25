var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Consultorio } from "../consultorio/consultorio.entity.js";
export let Secretaria = class Secretaria extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Secretaria.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Secretaria.prototype, "apellido", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Secretaria.prototype, "mail", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Secretaria.prototype, "contrase\u00F1a", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Secretaria.prototype, "telefono", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", Number)
], Secretaria.prototype, "dni", void 0);
__decorate([
    ManyToOne(() => Consultorio, { nullable: false }),
    __metadata("design:type", Object)
], Secretaria.prototype, "consultorio", void 0);
Secretaria = __decorate([
    Entity()
], Secretaria);
//# sourceMappingURL=secretaria.entity.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, OneToMany, Property, Cascade, Collection, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Secretaria } from '../secretaria/secretaria.entity.js';
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js';
export let Consultorio = class Consultorio extends BaseEntity {
    constructor() {
        super(...arguments);
        this.Secretarias = new Collection(this);
        this.Kinesiologos = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Consultorio.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Consultorio.prototype, "domicilio", void 0);
__decorate([
    OneToMany(() => Secretaria, (secretaria) => secretaria.consultorio, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], Consultorio.prototype, "Secretarias", void 0);
__decorate([
    OneToMany(() => Kinesiologo, (kinesiologo) => kinesiologo.consultorio, {
        cascade: [Cascade.ALL]
    }),
    __metadata("design:type", Object)
], Consultorio.prototype, "Kinesiologos", void 0);
Consultorio = __decorate([
    Entity()
], Consultorio);
//# sourceMappingURL=consultorio.entity.js.map
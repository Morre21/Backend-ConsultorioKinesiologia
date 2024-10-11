var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, Collection, Cascade, OneToMany } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Turno } from "../turnos/turno.entity.js";
import { Precio } from "../precio/precio.entity.js";
export let TipoAtencion = class TipoAtencion extends BaseEntity {
    constructor() {
        super(...arguments);
        this.Turnos = new Collection(this);
        this.Precios = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], TipoAtencion.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Boolean)
], TipoAtencion.prototype, "estado", void 0);
__decorate([
    OneToMany(() => Turno, (turno) => turno.tipoAtencion, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], TipoAtencion.prototype, "Turnos", void 0);
__decorate([
    OneToMany(() => Precio, (precio) => precio.tipoAtencion, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], TipoAtencion.prototype, "Precios", void 0);
TipoAtencion = __decorate([
    Entity()
], TipoAtencion);
//# sourceMappingURL=ta.entity.js.map
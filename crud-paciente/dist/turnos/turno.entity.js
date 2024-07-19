import { ObjectId } from 'mongodb';
export class Turno {
    constructor(fecha, hora, estado, importeTotal, _id = ObjectId) {
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
        this.importeTotal = importeTotal;
        this._id = _id;
    }
}
//# sourceMappingURL=turno.entity.js.map
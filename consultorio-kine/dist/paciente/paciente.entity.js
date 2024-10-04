import { ObjectId } from 'mongodb';
export class Paciente {
    constructor(nombre, apellido, dni, fechaNacimiento, email, telefono, password, estado, obraSocial, _id = ObjectId) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
        this.password = password;
        this.estado = estado;
        this.obraSocial = obraSocial;
        this._id = _id;
    }
}
//# sourceMappingURL=paciente.entity.js.map
import { ObjectId } from 'mongodb';
export class Kinesiologo {
    constructor(nombre, especialidad, apellido, dni, matricula, mail, telefono, password, _id = ObjectId) {
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.apellido = apellido;
        this.dni = dni;
        this.matricula = matricula;
        this.mail = mail;
        this.telefono = telefono;
        this.password = password;
        this._id = _id;
    }
}
//# sourceMappingURL=kinesiologo.entity.js.map
import crypto from 'node:crypto';
export class Paciente {
    constructor(nombre, apellido, dni, fechaNacimiento, obraSocial, telefono, email, password, estado, id = crypto.randomUUID()) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNacimiento = fechaNacimiento;
        this.obraSocial = obraSocial;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
        this.estado = estado;
        this.id = id;
    }
}
//# sourceMappingURL=paciente.entity.js.map
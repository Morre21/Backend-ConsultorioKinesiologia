import crypto from 'node:crypto'

export class Paciente {
    constructor(
      public nombre: string,
      public apellido: string,
      public dni: string,
      public fechaNacimiento: string,
      public obraSocial: string,
      public telefono: string,
      public email: string,
      public password: string,
      public estado: string,
      public id = crypto.randomUUID()
    ) {}
  }
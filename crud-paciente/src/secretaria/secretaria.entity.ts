import { ObjectId } from 'mongodb';

export class Secretaria {
  constructor(
    public nombre: string,
    public apellido: string,
    public mail: string,
    public contraseña: string,
    public telefono: number,
    public dni: number,
    public _id?: ObjectId
  ) {}
}

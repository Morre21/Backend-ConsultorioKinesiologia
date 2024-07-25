import { ObjectId } from 'mongodb'
export class Paciente{
    constructor(
        public nombre:string, 
        public apellido:string, 
        public dni:number, 
        public fechaNacimiento:number, 
        public email:string, 
        public telefono:number,
        public password: string,
        public estado: string,
        public obraSocial: string,
        public _id = ObjectId
    )   {}
}

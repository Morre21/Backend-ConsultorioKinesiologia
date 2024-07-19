import { ObjectId } from 'mongodb'
export class Turno{
    constructor(
        public fecha:string, 
        public hora:string,
        public estado:string, 
        public importeTotal:number, 
        public _id = ObjectId
    )   {}
}

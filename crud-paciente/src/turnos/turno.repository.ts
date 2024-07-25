import { Repository } from "../shared/repository.js"
import { Turno } from "./turno.entity.js"
import { db } from '../shared/db/conn.js'
import { ObjectId } from "mongodb"

const turnos = db.collection<Turno>('turnos')

export class TurnoRepository implements Repository <Turno>{
    public async findAll(): Promise<Turno[] | undefined> {
        return await turnos.find().toArray()
    }
    public async findOne(item: { id: string; }): Promise<Turno | undefined> {
        const _id = new ObjectId(item.id);
        return (await turnos.findOne( {_id: ObjectId} ) ) || undefined
    }
    public async add(item: Turno): Promise<Turno | undefined> {
        item._id=(await turnos.insertOne(item)).insertedId
        return item
    }
    public async update (id:string, item: Turno): Promise<Turno | undefined> {
        const _id = new ObjectId(id)
        return (await turnos.findOneAndUpdate({_id: ObjectId}, {$set: item},
        {returnDocument: 'after'})) || undefined
    }
    public async delete(item: { id: string; }): Promise<Turno | undefined> {
        const _id = new ObjectId(item.id)
        return (await turnos.findOneAndDelete ({_id:ObjectId})) || undefined
    }
}
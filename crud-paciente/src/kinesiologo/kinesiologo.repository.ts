import { Repository } from "../shared/repository.js"
import { Kinesiologo } from "./kinesiologo.entity.js"
import { db } from '../shared/db/conn.js'
import { ObjectId } from "mongodb"

/*const kinesiologosArray = [
    new Kinesiologo(
        'Enzo',
        'deporte',
        'Manavella',
        45343253,
        51364,
        'emanavella234@gmail.com',
        54345275353,
        'enzoM121srqq',
        ObjectId
    ),
]*/

const kinesiologos = db.collection<Kinesiologo>('kinesiologos')

export class KinesiologoRepository implements Repository <Kinesiologo>{
    public async findAll(): Promise<Kinesiologo[] | undefined> {
        return await kinesiologos.find().toArray()
    }
    public async findOne(item: { id: string; }): Promise<Kinesiologo | undefined> {
        const _id = new ObjectId(item.id);
        return (await kinesiologos.findOne( {_id: ObjectId} ) ) || undefined
    }
    public async add(item: Kinesiologo): Promise<Kinesiologo | undefined> {
        item._id=(await kinesiologos.insertOne(item)).insertedId
        return item
    }
    public async update (id:string, item: Kinesiologo): Promise<Kinesiologo | undefined> {
        const _id = new ObjectId(id)
        return (await kinesiologos.findOneAndUpdate({_id: ObjectId}, {$set: item},
        {returnDocument: 'after'})) || undefined
    }
    public async delete(item: { id: string; }): Promise<Kinesiologo | undefined> {
        const _id = new ObjectId(item.id)
        return (await kinesiologos.findOneAndDelete ({_id:ObjectId})) || undefined
    }
}
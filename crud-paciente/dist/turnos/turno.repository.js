import { db } from '../shared/db/conn.js';
import { ObjectId } from "mongodb";
const turnos = db.collection('turnos');
export class TurnoRepository {
    async findAll() {
        return await turnos.find().toArray();
    }
    async findOne(item) {
        const _id = new ObjectId(item.id);
        return (await turnos.findOne({ _id: ObjectId })) || undefined;
    }
    async add(item) {
        item._id = (await turnos.insertOne(item)).insertedId;
        return item;
    }
    async update(id, item) {
        const _id = new ObjectId(id);
        return (await turnos.findOneAndUpdate({ _id: ObjectId }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async delete(item) {
        const _id = new ObjectId(item.id);
        return (await turnos.findOneAndDelete({ _id: ObjectId })) || undefined;
    }
}
//# sourceMappingURL=turno.repository.js.map
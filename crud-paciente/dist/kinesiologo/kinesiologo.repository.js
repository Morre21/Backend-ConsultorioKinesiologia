import { db } from '../shared/db/conn.js';
import { ObjectId } from "mongodb";
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
const kinesiologos = db.collection('kinesiologos');
export class KinesiologoRepository {
    async findAll() {
        return await kinesiologos.find().toArray();
    }
    async findOne(item) {
        const _id = new ObjectId(item.id);
        return (await kinesiologos.findOne({ _id: ObjectId })) || undefined;
    }
    async add(item) {
        item._id = (await kinesiologos.insertOne(item)).insertedId;
        return item;
    }
    async update(id, item) {
        const _id = new ObjectId(id);
        return (await kinesiologos.findOneAndUpdate({ _id: ObjectId }, { $set: item }, { returnDocument: 'after' })) || undefined;
    }
    async delete(item) {
        const _id = new ObjectId(item.id);
        return (await kinesiologos.findOneAndDelete({ _id: ObjectId })) || undefined;
    }
}
//# sourceMappingURL=kinesiologo.repository.js.map
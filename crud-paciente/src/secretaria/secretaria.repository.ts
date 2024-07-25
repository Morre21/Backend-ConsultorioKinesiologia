import { Repository } from '../shared/repository.js'
import { Secretaria } from './secretaria.entity.js'
import { db } from '../shared/db/conn.js'
import { ObjectId } from 'mongodb'

const secretarias = db.collection<Secretaria>('secretarias')

export class SecretariaRepository implements Repository<Secretaria> {
  public async findAll(): Promise<Secretaria[] | undefined> {
    return await secretarias.find().toArray()
  }

  public async findOne(item: { id: string }): Promise<Secretaria | undefined> {
    const _id = new ObjectId(item.id);
    return (await secretarias.findOne({_id})) || undefined 
  }

  public async add(item: Secretaria): Promise<Secretaria | undefined> {
    item._id = (await secretarias.insertOne(item)).insertedId
    return item
  }

  public async update(id:string,item:Secretaria): Promise<Secretaria | undefined> {
    const _id = new ObjectId (id)
    return (await secretarias.findOneAndUpdate({_id}, {$set:item}, {returnDocument:'after'})) || undefined
  }

  public async delete(item: { id: string }): Promise<Secretaria | undefined> {
    const _id = new ObjectId(item.id) 
    return (await secretarias.findOneAndDelete({_id})) || undefined
  }
}

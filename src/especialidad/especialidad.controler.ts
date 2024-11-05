import { Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Especialidad } from './especialidad.entity.js'
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js';

const em = orm.em

async function findAll(req: Request, res: Response) {
  try{
    const especialidad = await em.find( Especialidad, {} )
    res.status(200).json( {message: 'Todas las especialidades fueron encontradas', data: especialidad})
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const especialidad = await em.findOneOrFail(Especialidad, { id })
    res.status(200).json({ message: 'Especialidad encontrada exitosamente', data: especialidad })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try{
    const especialidad = em.create(Especialidad, req.body)
    await em.flush()
    res.status(201).json({ message: 'Especialidad creada exitosamente', data: especialidad })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const especialidad = em.getReference(Especialidad, id)
    em.assign(especialidad, req.body)
    await em.flush()
    res.status(200).json({ message: 'Especialidad modificada exitosamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const especialidad = em.getReference(Especialidad, id)
    await em.removeAndFlush(especialidad)
    res.status(200).send({ message: 'Especialidad borrada exitosamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  } 
}


async function findKinesiologosByEspecialidad(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const especialidad = await em.findOne(Especialidad, { id }, { populate: ['Kinesiologos'] }); // Asegúrate de que 'kinesiologos' es el nombre correcto de la relación en tu entidad

    if (!especialidad) {
      return res.status(404).json({ message: 'Especialidad no encontrada' });
    }

    res.status(200).json({ message: 'Kinesiólogos encontrados', data: especialidad.Kinesiologos });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener kinesiólogos', error });
  }
}

export { findAll, findOne, add, update, remove, findKinesiologosByEspecialidad };
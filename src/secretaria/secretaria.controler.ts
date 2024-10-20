import { Request, Response, NextFunction } from 'express'
import { Secretaria } from './secretaria.entity.js'
import { orm } from '../shared/db/orm.js'
import { hashPassword } from '../auth/auth.js'

const em = orm.em

function sanitizeSecretariaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    mail: req.body.mail,
    contraseña: req.body.contraseña,
    telefono: req.body.telefono,
    dni: req.body.dni,
    consultorio: req.body.consultorio,
    
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const secretarias = await em.find(Secretaria, {}, { populate: ['consultorio'] })
    res.status(200).json({ message: 'Todas las secretarias encontradas', data: secretarias })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const secretaria = await em.findOneOrFail( Secretaria, { id }, { populate: ['consultorio'] })
    res.status(200).json({ message: 'Secretaria encontrada con exito', data: secretaria })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    // Verificar si el Secretaria ya existe
    const existingSecretaria = await em.findOne(Secretaria, { dni: req.body.sanitizedInput.dni });
    
    if (existingSecretaria) {
      return res.status(400).json({ message: 'El Secretaria ya existe' });
    }

    const hashedPassword = await hashPassword(req.body.sanitizedInput.contraseña);
    // Asigno a la constante data el hash de la contraseña
    const secretarialogoData =  {
      ...req.body.sanitizedInput,
        contraseña: hashedPassword};
  
    // Creo secretaria pasandole como parametro la constante secretarialogoData 
    const secretaria = em.create(Secretaria, secretarialogoData)
    await em.flush()
    res.status(201).json({ message: 'Secretaria creada exitosamente', data: secretaria })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const secretariaToUpdate = await em.findOneOrFail(Secretaria, { id })
    em.assign(secretariaToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Secretaria modificada exitosamente', data: secretariaToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const secretaria = em.getReference(Secretaria, id)
    await em.removeAndFlush(secretaria)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeSecretariaInput, findAll, findOne, add, update, remove }
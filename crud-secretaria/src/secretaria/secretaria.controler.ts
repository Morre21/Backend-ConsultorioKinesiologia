import { Request, Response, NextFunction } from 'express'
import { SecretariaRepository } from './secretaria.repository.js'
import { Secretaria } from './secretaria.entity.js'

const repository = new SecretariaRepository()

function sanitizeCharacterInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    mail: req.body.mail,
    contraseña: req.body.contraseña,
    telefono: req.body.telefono,
    dni: req.body.dni,
    
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
  res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response) {
  const id = req.params.id
  const secretaria = await repository.findOne({ id })
  if (!secretaria) {
    return res.status(404).send({ message: 'Secretiaria not found' })
  }
  res.json({ data: secretaria })
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const secretariaInput = new Secretaria(
    input.nombre,
    input.apellido,
    input.mail,
    input.contraseña,
    input.telefono,
    input.dni,
  )

  const secretaria = await repository.add(secretariaInput)
  return res.status(201).send({ message: 'Secretaria created', data: secretaria })
}

async function update(req: Request, res: Response) {
  const secretaria = await repository.update(req.params.id,req.body.sanitizedInput)

  if (!secretaria) {
    return res.status(404).send({ message: 'Secretaria not found' })
  }

  return res.status(200).send({ message: 'Secretaria updated successfully', data: secretaria })
}

async function remove(req: Request, res: Response) {
  const id = req.params.id
  const secretaria = await repository.delete({ id })

  if (!secretaria) {
    res.status(404).send({ message: 'Secretaria not found' })
  } else {
    res.status(200).send({ message: 'Secretaria deleted successfully' })
  }
}

export { sanitizeCharacterInput, findAll, findOne, add, update, remove }

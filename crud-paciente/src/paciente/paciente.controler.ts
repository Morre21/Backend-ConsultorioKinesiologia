import { Request, Response, NextFunction, response } from 'express'
import { PacienteRepository } from './paciente.repository.js'  
import { Paciente } from './paciente.entity.js'

const repository = new PacienteRepository();

function sanitizePacienteInput(req: Request, _res: Response, next: NextFunction) {
 if (typeof req.body === 'object' && req.body !== null) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    pacienteClass: req.body.pacienteClass,
    dni: req.body.dni,
    fechaNacimiento: req.body.fechaNacimiento,
    obraSocial: req.body.obraSocial,
    telefono: req.body.telefono,
    email: req.body.email,
    password: req.body.password,
    estado: req.body.estado,
  }


  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
}
  next()
}

function findAll( req: Request, res: Response) {
  res.json({ data: repository.findAll()})
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const paciente = repository.findOne({id});
  if (!paciente) {
    return res.status(404).json({message: 'Paciente no encontrado'});
  }
  res.json ({data: paciente});
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const pacienteInput = new Paciente (input.nombre, input.apellido, input.dni, input.fechaNacimiento, input.obraSocial, input.telefono, input.email, input.password,input.estado)

  const paciente = repository.add(pacienteInput)
 return res.status(201).send({ message:'paciente', data: paciente})
} 

function update(req: Request, res: Response)  {
  req.body.sanitizedInput.id = req.params.id;
  const paciente = repository.update(req.body.sanitizedInput)

  if (!paciente) {
    return res.status(404).send({message: 'Paciente no encontrado'});
  }
  return res.status(200).send({ message: 'paciente actualizado correctamente', data: paciente })
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const paciente = repository.delete({id})

  if (!paciente) {
    return res.status(404).send({message: 'Paciente no encontrado'});
  }
  return res.status(200).send({message: 'Paciente eliminado correctamente'});
};


export { sanitizePacienteInput, findAll, findOne, add, update, remove}

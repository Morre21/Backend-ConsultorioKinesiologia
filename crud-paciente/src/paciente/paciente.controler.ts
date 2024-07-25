import { Request, Response, NextFunction } from "express"
import { PacienteRepository } from "./paciente.repository.js"
import { Paciente } from "./paciente.entity.js"

//El controler tiene toda la lógica de negocio 
const repository = new PacienteRepository()

function sanitizePacienteInput(req: Request, res: Response, next: NextFunction){
   
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        fechaNacimiento: req.body.fechaNacimiento,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password,
        obraSocial: req.body.obraSocial,
        estado: req.body.estado
    }
    Object.keys(req.body.sanitizedInput).forEach((key)=>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll (req: Request,res: Response) {
    res.json({data: await repository.findAll()})
}

async function findOne (req: Request,res: Response){
    // lo que hago en las lineas de abajo es pasarle un objeto
    const id= req.params.id
    const paciente = await repository.findOne({id})
    if(!paciente){
        return res.status(404).send({ message:'paciente not found'})
       
    }
    res.json({data:paciente})
}

async function add (req: Request, res: Response) {
    const input = req.body.sanitizedInput

    const pacienteInput = new Paciente (
        input.nombre, 
        input.apellido, 
        input.dni, 
        input.fechaNacimiento, 
        input.email, 
        input.telefono,
        input.password,
        input.estado, 
        input.obraSocial
    )
    const paciente= await repository.add(pacienteInput)
    return res.status(201).send({ message:'paciente created', data: paciente})
} 

async function update (req: Request, res: Response) {
    const paciente= await repository.update(req.params.id, req.body.sanitizedInput)
    
    if(!paciente){
        return res.status(404).send({message: 'paciente not found'})
    }

    return res.status(200).send({message: 'paciente updated successfully', data: paciente })
}

async function remove(req: Request, res: Response) {
    const id=req.params.id
    const paciente = await repository.delete({id})

    if(!paciente){
        res.status(404).send({message: 'paciente not found'})
    } else{
    res.status(200).send({message: 'paciente deleted successfully'})
    }
}

/*Podría crear un objeto con todas estas funciones a exportar, así:

export const controler = {
    sanitizeCharacterInput,
    findAll, 
    findOne,
} */
export {sanitizePacienteInput, findAll, findOne, add, update, remove}
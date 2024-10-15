import { Request, Response, NextFunction } from "express"
import { Paciente } from "./paciente.entity.js"
import { orm } from "../shared/db/orm.js"
import { hashPassword } from "../auth/auth.js";

const em = orm.em

function sanitizePacienteInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
      fechaNacimiento: req.body.fechaNacimiento,
      email: req.body.email,
      telefono: req.body.telefono,
      password: req.body.password,
      estado: req.body.estado,
      obraSocial: req.body.obraSocial,
    };
  
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key];
      }
    });
  
    next();
  }

async function findAll (req: Request,res: Response) {
 try{
    const pacientes = await em.find(Paciente, {})
    res.status(200).json({message: 'Todos los pacientes encontrados',data: pacientes})
 } catch (error: any){
    res.status(500).json({message: error.message})
 }
}

async function findOne (req: Request,res: Response){
    try{
        const id = Number.parseInt(req.params.id)
        const paciente = await em.findOneOrFail(Paciente, {id})
        res.status(200).json({message: 'Paciente encontrado exitosamente', data: paciente})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function add (req: Request, res: Response) {
    try{
        
        const hashedPassword = await hashPassword(req.body.sanitizedInput.password)
        const PacienteData = {
            ...req.body.sanitizedInput,
            password : hashedPassword
        }
        const paciente = em.create(Paciente, PacienteData)
        await em.flush()
        res.status(201).json({message: 'Paciente creado exitosamente', data: paciente})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function update (req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const paciente = em.getReference(Paciente, id)
        em.assign(paciente, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: 'Paciente modificado exitosamente'})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
   try{
       const id = Number.parseInt(req.params.id)
       const paciente = em.getReference(Paciente, id)
       await em.removeAndFlush(paciente)
       res.status(200).send({message: 'Paciente borrado exitosamente'})
   } catch (error: any){
       res.status(500).json({message: error.message})
   }
}
export { sanitizePacienteInput ,findAll, findOne, add, update, remove}
import { Request, Response, NextFunction } from "express"
import { Paciente } from "./paciente.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em


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
        const paciente = em.create(Paciente, req.body)
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
        em.assign(paciente, req.body)
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
export {findAll, findOne, add, update, remove}
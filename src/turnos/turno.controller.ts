import { Request, Response, NextFunction } from "express"
import { Turno } from "./turno.entity.js"
import { orm } from '../shared/db/orm.js'


const em = orm.em

function sanitizeTurnoInput(req: Request, res: Response, next: NextFunction){
   
    req.body.sanitizedInput = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        estado: req.body.estado,
        importeTotal: req.body.importeTotal,
        paciente: req.body.paciente,
        kinesiologo: req.body.kinesiologo,
    };
    Object.keys(req.body.sanitizedInput).forEach((key)=>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
        }
    });
    next();
}

async function findAll (req: Request,res: Response): Promise<void>  {
   try{
       const turnos = await em.find(Turno, {}, {populate: ['paciente', 'kinesiologo']})
       res.status(200).json({message: 'Todos los turnos encontrados', data: turnos})
   } catch (error: any){        
       res.status(500).json({message: error.message})
   }
}

async function findOne (req: Request,res: Response): Promise<void> {
    try{
        const id = Number.parseInt(req.params.id)
        const turno = await em.findOneOrFail(Turno, {id}, {populate: ['paciente', 'kinesiologo']})
        res.status(200).json({message: 'Turno encontardo con exito', data: turno})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function add (req: Request, res: Response): Promise<void>  {
    try{
        const {fecha, hora, kinesiologo} =  req.body.sanitizedInput;
        
        const existeTurno = await em.findOne(Turno, {fecha, hora, kinesiologo});
        if (existeTurno){
          res.status(400).json({message: 'Ya existe un turno para ese kinesiologo en ese horario'});
          return
        }    
         
        const turno = em.create(Turno, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({message: 'Turno creado exitosamente', data: turno});
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
} 

async function update (req: Request, res: Response): Promise<void>  {
    try{
        const id = Number.parseInt(req.params.id)
        const turnoToUpdate = await em.findOneOrFail(Turno, {id});
        em.assign(turnoToUpdate, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: 'Turno modificado exitosamente', data: turnoToUpdate});
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
}

async function remove(req: Request, res: Response): Promise<void>  {
    try{
        const id = Number.parseInt(req.params.id);
        const turno = em.getReference(Turno, id);
        await em.removeAndFlush(turno);
        res.status(200).send({message: 'Turno borrado exitosamente'});
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
}

export {sanitizeTurnoInput, findAll, findOne, add, update, remove}; 
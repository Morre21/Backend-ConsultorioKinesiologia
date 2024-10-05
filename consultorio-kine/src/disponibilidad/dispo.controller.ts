import {Request, Response, NextFunction} from 'express'
import { Disponibilidad } from './dispo.enitity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizedInput (req: Request, res: Response, next: NextFunction) {

    req.body.sanitizedInput = {
        fecha: req.body.fecha,
        dia: req.body.dia,
        estado: req.body.estado,
        horaDesde: req.body.horaDesde,
        horaHasta: req.body.horaHasta,
        kinesiologo: req.body.kinesiologo,
        consultorio: req.body.consultorio,
        tipoAtencion: req.body.tipoAtencion,
    }
    Object.keys(req.body.sanitizedInput).forEach((key)=>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll (req: Request,res: Response) { 
    try{
        const disponibilidad = await em.find(Disponibilidad, {}, {populate: ['kinesiologo', 'consultorio', 'tipoAtencion']})
        res.status(200).json({message: 'Todas las disponibilidades fueron encontradas', data: disponibilidad})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne (req: Request,res: Response){
    try{
        const id = Number.parseInt(req.params.id)
        const disponibilidad = await em.findOneOrFail(Disponibilidad, {id}, {populate: ['kinesiologo', 'consultorio', 'tipoAtencion']})
        res.status(200).json({message: 'Disponibilidad encontrada con exito', data: disponibilidad})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function add (req: Request, res: Response) {
    try{
        const disponibilidad = em.create(Disponibilidad, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({message: 'Disponibilidad creada exitosamente', data: disponibilidad})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function update (req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const disponibilidadToUpdate = await em.findOneOrFail(Disponibilidad, {id})
        em.assign(disponibilidadToUpdate, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: 'Disponibilidad modificada exitosamente'})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const disponibilidad = em.getReference(Disponibilidad, id)
        await em.removeAndFlush(disponibilidad)
        res.status(200).send({message: 'Disponibilidad borrada exitosamente'})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

export {sanitizedInput, findAll, findOne, add, update, remove}
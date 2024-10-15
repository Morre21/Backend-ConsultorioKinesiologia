import { Router } from 'express'
import { findAll, findOne, add, update, remove } from './consultorio.controler.js'
import { validateConsultorio } from './consultorio.validator.js'

export const consultorioRouter = Router()

consultorioRouter.get('/', findAll)
consultorioRouter.get('/:id', findOne)
consultorioRouter.post('/',validateConsultorio, add)
consultorioRouter.put('/:id',validateConsultorio, update)
consultorioRouter.delete('/:id', remove)

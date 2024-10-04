import { Router } from 'express'
import { findAll, findOne, add, update, remove } from './especialidad.controller.js'
import { validateEspecialidad } from './especialidad.validator.js'
import { validarErrores } from '../middlewares/validacionErrores.js'


const especialidadRouter = Router()

especialidadRouter.get('/', findAll)
especialidadRouter.get('/:id', findOne)
especialidadRouter.post('/', validateEspecialidad, validarErrores, add)
especialidadRouter.put('/:id',validateEspecialidad, validarErrores, update)
especialidadRouter.patch('/:id', validateEspecialidad, validarErrores, update)
especialidadRouter.delete('/:id', remove)

export {especialidadRouter};

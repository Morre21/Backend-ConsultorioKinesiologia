import { Router } from 'express'
import { findAll, findOne, add, update, remove } from './especialidad.controler.js'
import { validateEspecialidad } from './especialidad.validator.js'
import { validarErrores } from '../middlewares/validacionErrores.js'
import { findKinesiologosByEspecialidad } from './especialidad.controler.js'
import { authToken } from '../middlewares/authToken.js'

const especialidadRouter = Router()

especialidadRouter.get('/', authToken,findAll)
especialidadRouter.get('/:id', findOne)
especialidadRouter.get('/:especialidadId/:consultorioId/kinesiologos', findKinesiologosByEspecialidad)
especialidadRouter.post('/', validateEspecialidad, validarErrores, add)
especialidadRouter.put('/:id',validateEspecialidad, validarErrores, update)
especialidadRouter.patch('/:id', validateEspecialidad, validarErrores, update)
especialidadRouter.delete('/:id', remove)

export {especialidadRouter};

import { Router } from 'express'
import { sanitizeCharacterInput, findAll, findOne, add, update, remove } from './secretaria.controler.js'

export const secretariaRouter = Router()

secretariaRouter.get('/', findAll)
secretariaRouter.get('/:id', findOne)
secretariaRouter.post('/', sanitizeCharacterInput, add)
secretariaRouter.put('/:id', sanitizeCharacterInput, update)
secretariaRouter.patch('/:id', sanitizeCharacterInput, update)
secretariaRouter.delete('/:id', remove)

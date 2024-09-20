import { Router } from 'express'
import { findAll, findOne, add, update, remove } from './ta.controler.js'

export const tipoatencionRouter = Router()

tipoatencionRouter.get('/', findAll)
tipoatencionRouter.get('/:id', findOne)
tipoatencionRouter.post('/', add)
tipoatencionRouter.put('/:id', update)
tipoatencionRouter.delete('/:id', remove)


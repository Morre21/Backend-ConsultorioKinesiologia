import e, { Router } from 'express'
import { sanitizeSecretariaInput, findAll, findOne, add, update, remove } from './secretaria.controler.js'
import { validateSecretaria } from './secretaria.validator.js' 
import { validarErrores } from '../middlewares/validacionErrores.js'
import { manejoErrores } from '../middlewares/manejoErrores.js'


const secretariaRouter = Router()

secretariaRouter.get('/', findAll)
secretariaRouter.get('/:id', findOne)
secretariaRouter.post('/', validateSecretaria,validarErrores, sanitizeSecretariaInput, add)
secretariaRouter.put('/:id', validateSecretaria,validarErrores, sanitizeSecretariaInput, update)
secretariaRouter.patch('/:id', validateSecretaria,validarErrores, sanitizeSecretariaInput, update)
secretariaRouter.delete('/:id', remove)

secretariaRouter.use((err: any, req: e.Request, res: e.Response, next: e.NextFunction) => {   
    manejoErrores(err, req, res, next);
  });

export {secretariaRouter};
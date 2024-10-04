import { Router,} from 'express';
import { sanitizeKinesiologoInput, findAll, findOne, add, update, remove} from "./kinesiologo.controler.js";
import { validateKinesiologo } from './kinesiologo.validator.js'; 
import { validarErrores } from '../middlewares/validacionErrores.js';
import { manejoErrores } from '../middlewares/manejoErrores.js';

const kinesiologoRouter = Router();

// Acá definimos las rutas para cada método del controlador
kinesiologoRouter.get('/', findAll)
kinesiologoRouter.get('/:id', findOne)
kinesiologoRouter.post('/', validateKinesiologo, validarErrores, sanitizeKinesiologoInput, add)
kinesiologoRouter.put('/:id', validateKinesiologo, validarErrores, sanitizeKinesiologoInput, update)
kinesiologoRouter.patch('/:id', validateKinesiologo, validarErrores, sanitizeKinesiologoInput, update)
kinesiologoRouter.delete('/:id', remove)

import { Request, Response, NextFunction } from 'express';

kinesiologoRouter.use((err: any, req: Request, res: Response, next: NextFunction) => {
  manejoErrores(err, req, res, next);
});

export {kinesiologoRouter};

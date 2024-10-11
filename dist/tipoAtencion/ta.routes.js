import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './ta.controller.js';
import { validateTipoAtencion } from './ta.validator.js';
import { validarErrores } from '../middlewares/validacionErrores.js';
export const tipoatencionRouter = Router();
tipoatencionRouter.get('/', findAll);
tipoatencionRouter.get('/:id', findOne);
tipoatencionRouter.post('/', validateTipoAtencion, validarErrores, add);
tipoatencionRouter.put('/:id', validateTipoAtencion, validarErrores, update);
tipoatencionRouter.patch('/:id', validateTipoAtencion, validarErrores, update);
tipoatencionRouter.delete('/:id', remove);
//# sourceMappingURL=ta.routes.js.map
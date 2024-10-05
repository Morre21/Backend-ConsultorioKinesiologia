import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './consultorio.controller.js';
export const consultorioRouter = Router();
consultorioRouter.get('/', findAll);
consultorioRouter.get('/:id', findOne);
consultorioRouter.post('/', add);
consultorioRouter.put('/:id', update);
consultorioRouter.delete('/:id', remove);
//# sourceMappingURL=consultorio.routes.js.map
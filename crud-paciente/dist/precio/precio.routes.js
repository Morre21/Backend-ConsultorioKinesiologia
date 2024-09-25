import { Router } from 'express';
import { sanitizePrecioInput, findAll, findOne, add, update, remove } from './precio.controler.js';
export const precioRouter = Router();
precioRouter.get('/', findAll);
precioRouter.get('/:id', findOne);
precioRouter.post('/', sanitizePrecioInput, add);
precioRouter.put('/:id', sanitizePrecioInput, update);
precioRouter.delete('/:id', remove);
//# sourceMappingURL=precio.routes.js.map
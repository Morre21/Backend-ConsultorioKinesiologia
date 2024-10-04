import { Router } from 'express';
import { sanitizeSecretariaInput, findAll, findOne, add, update, remove } from './secretaria.controler.js';
export const secretariaRouter = Router();
secretariaRouter.get('/', findAll);
secretariaRouter.get('/:id', findOne);
secretariaRouter.post('/', sanitizeSecretariaInput, add);
secretariaRouter.put('/:id', sanitizeSecretariaInput, update);
secretariaRouter.patch('/:id', sanitizeSecretariaInput, update);
secretariaRouter.delete('/:id', remove);
//# sourceMappingURL=secretaria.routes.js.map
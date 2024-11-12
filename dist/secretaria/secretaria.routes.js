import { Router } from 'express';
import { sanitizeSecretariaInput, findAll, findOne, obtenerSecretaria, add, update, remove, login, logout, } from './secretaria.controler.js';
import { validateSecretaria } from './secretaria.validator.js';
import { validarErrores } from '../middlewares/validacionErrores.js';
import { manejoErrores } from '../middlewares/manejoErrores.js';
import { authToken } from '../middlewares/authToken.js';
import { validateSecretariaUpdate } from './secretaria.validator.update.js';
const secretariaRouter = Router();
secretariaRouter.get('/', findAll);
secretariaRouter.get('/:id', findOne);
secretariaRouter.get('/k/:id', authToken, obtenerSecretaria);
secretariaRouter.patch('/k/:id', authToken, validateSecretariaUpdate, validarErrores, sanitizeSecretariaInput, update);
secretariaRouter.post('/', validateSecretaria, validarErrores, sanitizeSecretariaInput, add);
secretariaRouter.put('/:id', validateSecretaria, validarErrores, sanitizeSecretariaInput, update);
secretariaRouter.patch('/:id', validateSecretaria, validarErrores, sanitizeSecretariaInput, update);
secretariaRouter.delete('/:id', remove);
secretariaRouter.post('/login', login);
secretariaRouter.post('/logout', logout);
secretariaRouter.use((err, req, res, next) => {
    manejoErrores(err, req, res, next);
});
export { secretariaRouter };
//# sourceMappingURL=secretaria.routes.js.map
import { Router } from 'express';
import { sanitizeKinesiologoInput, findOne, obtenerKinesiologo, add, update, remove, login, logout, findKineByEspCon } from './kinesiologo.controler.js';
import { validateKinesiologo } from './kinesiologo.validator.js';
import { validateKinesiologoUpdate } from './kinesiologo.validator.update.js';
import { validarErrores } from '../middlewares/validacionErrores.js';
import { authToken } from '../middlewares/authToken.js';
import { manejoErrores } from '../middlewares/manejoErrores.js';
import { obtenerTurnosKinesiologo } from './kinesiologo.controler.js';
const kinesiologoRouter = Router();
kinesiologoRouter.post('/login', login);
kinesiologoRouter.get('/turnos', authToken, obtenerTurnosKinesiologo);
// Acá definimos las rutas para cada método del controlador
kinesiologoRouter.get('/:especialidadId', authToken, findKineByEspCon);
kinesiologoRouter.get('/:id', findOne);
kinesiologoRouter.get('/k/:id', authToken, obtenerKinesiologo);
kinesiologoRouter.post('/', validateKinesiologo, validarErrores, sanitizeKinesiologoInput, add);
kinesiologoRouter.put('/:id', authToken, validateKinesiologo, validarErrores, sanitizeKinesiologoInput, update);
kinesiologoRouter.patch('/k/:id', authToken, validateKinesiologoUpdate, validarErrores, sanitizeKinesiologoInput, update);
kinesiologoRouter.delete('/:id', authToken, remove);
kinesiologoRouter.post('/logout', logout);
kinesiologoRouter.use((err, req, res, next) => {
    manejoErrores(err, req, res, next);
});
export { kinesiologoRouter };
//# sourceMappingURL=kinesiologo.routes.js.map
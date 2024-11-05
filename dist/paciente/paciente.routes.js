import { Router } from 'express';
import { findAll, findOne, add, update, remove, sanitizePacienteInput, login, logout } from './paciente.controller.js';
import { validatePaciente } from './paciente.validator.js';
import { validarErrores } from '../middlewares/validacionErrores.js';
import { manejoErrores } from '../middlewares/manejoErrores.js';
import { authToken } from '../middlewares/authToken.js';
const pacienteRouter = Router();
pacienteRouter.post('/login', login);
pacienteRouter.get('/turnos', authToken);
pacienteRouter.post('/logout', logout);
/*Le definimos el directorio raiz, porque si queremos hacer una modificación.
De esta manera no queda atada y podemos utilizar la ruta que necesitemos en app.ts
*/
pacienteRouter.get('/', findAll);
pacienteRouter.get('/:id', findOne);
pacienteRouter.post('/', validatePaciente, validarErrores, sanitizePacienteInput, add);
pacienteRouter.put('/:id', authToken, validatePaciente, validarErrores, sanitizePacienteInput, update);
pacienteRouter.patch('/:id', authToken, validatePaciente, validarErrores, sanitizePacienteInput, update);
pacienteRouter.delete('/:id', authToken, remove);
pacienteRouter.use((err, req, res, next) => {
    manejoErrores(err, req, res, next);
});
export { pacienteRouter };
//# sourceMappingURL=paciente.routes.js.map
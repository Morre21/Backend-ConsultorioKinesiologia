import { Router } from 'express';
import { sanitizePacienteInput, findAll, findOne, add, update, remove } from './paciente.controler.js';
export const pacienteRouter = Router();
pacienteRouter.get('/', findAll);
pacienteRouter.get('/:id', findOne);
pacienteRouter.post('/', sanitizePacienteInput, add);
pacienteRouter.put('/:id', sanitizePacienteInput, update);
pacienteRouter.delete('/:id', remove);
//# sourceMappingURL=paciente.routes.js.map
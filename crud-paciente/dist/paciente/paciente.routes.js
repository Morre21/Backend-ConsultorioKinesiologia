//Acá hacemos una especie de índice por cada módulo
import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./paciente.controler.js";
export const pacienteRouter = Router();
/*Le definimos el directorio raiz, porque si queremos hacer una modificación.
De esta manera no queda atada y podemos utilizar la ruta que necesitemos en app.ts
*/
pacienteRouter.get('/', findAll);
pacienteRouter.get('/:id', findOne);
pacienteRouter.post('/', add);
pacienteRouter.put('/:id', update);
pacienteRouter.delete('/:id', remove);
//# sourceMappingURL=paciente.routes.js.map
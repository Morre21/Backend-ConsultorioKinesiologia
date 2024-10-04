//Acá hacemos una especie de índice por cada módulo
import { Router } from "express";
import {findAll, findOne, add, update, remove} from "./paciente.controller.js";
import { validatePaciente } from "./paciente.validator.js";
import { validarErrores } from "../middlewares/validacionErrores.js";
import { manejoErrores } from "../middlewares/manejoErrores.js";

const pacienteRouter = Router()

/*Le definimos el directorio raiz, porque si queremos hacer una modificación.
De esta manera no queda atada y podemos utilizar la ruta que necesitemos en app.ts 
*/
pacienteRouter.get('/', findAll)
pacienteRouter.get('/:id', findOne)
pacienteRouter.post('/',validatePaciente, validarErrores, add)
pacienteRouter.put('/:id',validatePaciente, validarErrores, update)
pacienteRouter.patch('/:id',validatePaciente, validarErrores, update)
pacienteRouter.delete('/:id', remove)

import { Request, Response, NextFunction } from 'express';

pacienteRouter.use((err: any, req: Request, res: Response, next: NextFunction) => {
  manejoErrores(err, req, res, next);
});

export {pacienteRouter};
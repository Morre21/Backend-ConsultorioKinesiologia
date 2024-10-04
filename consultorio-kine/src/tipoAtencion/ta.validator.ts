import {body} from 'express-validator'  
import { orm } from '../shared/db/orm.js';
import { TipoAtencion } from './ta.entity.js';
import {validatePrecio} from '../precio/precio.validator.js'

const em = orm.em;

export const validateTipoAtencion = [
  body('nombre')
    .isString().withMessage('El nombre del tipo de atención es obligatorio.')
    .notEmpty().withMessage('El nombre del tipo de atención no puede estar vacío.')
    .custom(async (value) => {
      const existe = await em.findOne(TipoAtencion, { nombre: value });
      if (!existe) {
        throw new Error('El tipo de atención no es valido.');
      }
      return true; 
    }),
...validatePrecio
];


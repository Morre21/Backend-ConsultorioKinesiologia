import {body} from 'express-validator'
import { validateTipoAtencion } from '../tipoAtencion/ta.validator'
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity'
import { Consultorio } from '../consultorio/consultorio.entity'
import { TipoAtencion } from '../tipoAtencion/ta.entity'
import { orm } from '../shared/db/orm'

const em = orm.em; 


export const validateDispo= [

  body('fecha') 
  .isDate()
  .notEmpty().withMessage('La fecha es obligatoria.'),

body ('estado')
  .isString()
  .notEmpty().withMessage('El estado es obligatorio.'), 

 body ('dia') 
  .isString()
  .notEmpty().withMessage('El dia es obligartorio.'),

  body('horaDesde') 
  .custom((value) => {
    //isNotaNumber
      const [hours, minutes] = value.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error('La horaDesde debe estar en formato HH:mm y ser válida.');
      }
      return true;
    })
  .notEmpty().withMessage('La horaDesde es obligatoria.'),

  // Validación de horaHasta (comparación con horaDesde)
   body('horaHasta')
    .custom((value, { req }) => {
      const [hoursDesde, minutesDesde] = req.body.horaDesde.split(':').map(Number);
      const [hoursHasta, minutesHasta] = value.split(':').map(Number);

      // Comprobar si horaHasta es menor que horaDesde
      if (isNaN(hoursHasta) || isNaN(minutesHasta) || hoursHasta < 0 || hoursHasta > 23 || minutesHasta < 0 || minutesHasta > 59) {
        throw new Error('La horaHasta debe estar en formato HH:mm y ser válida.');
      }

      const timeDesde = new Date(0, 0, 0, hoursDesde, minutesDesde);
      const timeHasta = new Date(0, 0, 0, hoursHasta, minutesHasta);

      if (timeHasta >= timeDesde) {
        throw new Error('La horaHasta debe ser menor que la horaDesde.');
      }

      return true;
    })
    .notEmpty().withMessage('La horaHasta es obligatoria.'),

    body('kinesiologo')
    .isString()
    .notEmpty().withMessage('La matricula del kinesiologo es obligatoria.')
    .custom(async (value) => {
      const existe = await em.findOne(Kinesiologo, {matricula: value});
      if (!existe) {
        throw new Error('El kinesiologo no existe.');
      }
      return true;
    }),
 ...validateTipoAtencion,

 body('consultorio')
    .isString()
    .notEmpty().withMessage('El consultorio es obligatorio.')
    .custom(async (value) => {
      const existe = await em.findOne(Consultorio, {nombre: value});
      if (!existe) {
        throw new Error('El consultorio no existe.');
      }
      return true;
    })
];  


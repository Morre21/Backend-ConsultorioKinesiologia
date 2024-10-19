import { body } from 'express-validator';
import { orm } from '../shared/db/orm.js';
import { Especialidad } from './especialidad.entity.js';

const em = orm.em;

export const validateEspecialidad = [
  body('nombre')
    .isString().withMessage('El nombre de la especialidad debe ser alfabetico.')
    .notEmpty().withMessage('El nombre de la especialidad es obligatorio.')
    .isIn(['Deportología', 'Osteopatía', 'Traumatología', 'Estética']).withMessage('El nombre de la especialidad no es válido.')
    .custom(async (value) => {
      const existe = await em.findOne(Especialidad, { nombre: value });
      if (existe) {
        throw new Error('La especialidad ya existe.');
      }
      return true;
    }),
];

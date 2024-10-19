import { body } from 'express-validator';
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js';
import { Paciente } from '../paciente/paciente.entity.js';
import { orm } from '../shared/db/orm.js';
import {Consultorio} from '../consultorio/consultorio.entity.js';
import { Turno } from './turno.entity.js';

const em = orm.em;

export const validateTurno = [
  body('fecha')
  .isDate().withMessage('La fecha es incorrecta (YYY-MM-DD).')
  .notEmpty().withMessage('La fecha es obligatoria.'),

  body('hora')
  .notEmpty().withMessage('La hora es obligatoria.')
  .custom(async (value, { req }) => {
    const kinesiologo = req.body.kinesiologo
    const fecha = req.body.fecha

    const turnoExistente = await em.findOne(Turno, {
      kinesiologo: kinesiologo,
      fecha: fecha,
      hora: value
    });

    if (!turnoExistente) {
      throw new Error('El kinesiólogo ya tiene un turno asignado en ese horario.');
    }
    return true;
  }).withMessage('El kinesiólogo ya tiene un turno en el horario seleccionado.')
  .custom((value) => {
    const [hours, minutes] = value.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      throw new Error('La hora debe estar en formato HH:mm y ser válida.');
    }
    return true;
  }),
  

  body('kinesiologo')
  .isInt()
  .notEmpty().withMessage('El kinesiologo es obligatorio.')
  .custom(async (value) => {
    const existe = await em.findOne(Kinesiologo, {id: value});
    if (!existe) {
      throw new Error('El kinesiologo no existe.');
    }
    return true;
  }),
  

  body('paciente')
  .isInt()
  .notEmpty().withMessage('El paciente es obligatorio.')
  .custom(async (value) => {
    const existe = await em.findOne(Paciente, {id: value});
    if (!existe) {
      throw new Error('El paciente no existe.');
    }
    return true;
  }),
];
import { body } from 'express-validator';
import { validateTipoAtencion } from '../tipoAtencion/ta.validator';
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity';
import { Paciente } from '../paciente/paciente.entity';
import { orm } from '../shared/db/orm';
import { Consultorio } from '../consultorio/consultorio.entity';
import { Turno } from './turno.entity.js';
const em = orm.em;
export const validateTurno = [
    body('fecha')
        .isDate().withMessage('La fecha es incorrecta (YYY-MM-DD).')
        .notEmpty().withMessage('La fecha es obligatoria.'),
    body('hora')
        .notEmpty().withMessage('La hora es obligatoria.')
        .custom((value) => {
        const [hours, minutes] = value.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            throw new Error('La hora debe estar en formato HH:mm y ser válida.');
        }
        return true;
    })
        .custom(async (value, { req }) => {
        const kinesiologo = req.body.kinesiologo;
        const fecha = req.body.fecha;
        const turnoExistente = await em.findOne(Turno, {
            kinesiologo: kinesiologo,
            fecha: fecha,
            hora: value
        });
        if (turnoExistente) {
            throw new Error('El kinesiólogo ya tiene un turno asignado en ese horario.');
        }
        return true;
    }).withMessage('El kinesiólogo ya tiene un turno en el horario seleccionado.'),
    body('kinesiologo')
        .isString()
        .notEmpty().withMessage('El kinesiologo es obligatorio.')
        .custom(async (value) => {
        const existe = await em.findOne(Kinesiologo, { matricula: value });
        if (!existe) {
            throw new Error('El kinesiologo no existe.');
        }
        return true;
    }),
    ...validateTipoAtencion,
    body('paciente')
        .isString()
        .notEmpty().withMessage('El paciente es obligatorio.')
        .custom(async (value) => {
        const existe = await em.findOne(Paciente, { dni: value });
        if (!existe) {
            throw new Error('El paciente no existe.');
        }
        return true;
    }),
    body('consultorio')
        .isString()
        .notEmpty().withMessage('El consultorio es obligatorio.')
        .custom(async (value) => {
        const existe = await em.findOne(Consultorio, { nombre: value });
        if (!existe) {
            throw new Error('El consultorio no existe.');
        }
        return true;
    }),
];
//# sourceMappingURL=turnoValidator.js.map
import { body } from 'express-validator';
import { validateTipoAtencion } from '../tipoAtencion/ta.validator.js';
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
export const validateDispo = [
    body('fechaDesde')
        .isDate()
        .notEmpty().withMessage('La fecha es obligatoria.'),
    body('diaSemana')
        .isString()
        .notEmpty().withMessage('El dia es obligartorio.'),
    body('horaInicio')
        .custom((value) => {
        //isNotaNumber
        const [hours, minutes] = value.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            throw new Error('La horaDesde debe estar en formato HH:mm y ser válida.');
        }
        return true;
    })
        .notEmpty().withMessage('La horaDesde es obligatoria.'),
    // Validación de horaFin (comparación con horaDesde)
    body('horaFin')
        .custom((value, { req }) => {
        const [hoursDesde, minutesDesde] = req.body.horaDesde.split(':').map(Number);
        const [hoursFin, minutesFin] = value.split(':').map(Number);
        // Comprobar si horaFin es menor que horaDesde
        if (isNaN(hoursFin) || isNaN(minutesFin) || hoursFin < 0 || hoursFin > 23 || minutesFin < 0 || minutesFin > 59) {
            throw new Error('La horaFin debe estar en formato HH:mm y ser válida.');
        }
        const timeDesde = new Date(0, 0, 0, hoursDesde, minutesDesde);
        const timeFin = new Date(0, 0, 0, hoursFin, minutesFin);
        if (timeFin >= timeDesde) {
            throw new Error('La horaFin debe ser menor que la horaDesde.');
        }
        return true;
    })
        .notEmpty().withMessage('La horaFin es obligatoria.'),
    body('kinesiologo')
        .isString()
        .notEmpty().withMessage('La matricula del kinesiologo es obligatoria.')
        .custom(async (value) => {
        const existe = await em.findOne(Kinesiologo, { matricula: value });
        if (!existe) {
            throw new Error('El kinesiologo no existe.');
        }
        return true;
    }),
    ...validateTipoAtencion,
];
//# sourceMappingURL=dispo.validator.js.map
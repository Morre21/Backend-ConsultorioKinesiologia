import { body } from 'express-validator';
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js';
import { Paciente } from '../paciente/paciente.entity.js';
import { orm } from '../shared/db/orm.js';
import { Turno } from './turno.entity.js';
import { Disponibilidad } from '../disponibilidad/dispo.enitity.js';
const em = orm.em;
export const validateTurno = [
    body('fecha')
        .isDate().withMessage('La fecha es incorrecta (YYY-MM-DD).')
        .notEmpty().withMessage('La fecha es obligatoria.'),
    body('hora')
        .notEmpty().withMessage('La hora es obligatoria.')
        .custom(async (value, { req }) => {
        const kinesiologo = req.body.kinesiologo;
        const fechaString = req.body.fecha;
        const hora = value;
        // Asegúrate de que la fecha esté en formato ISO (YYYY-MM-DD)
        const fechaStringISO = fechaString.includes("T") ? fechaString : `${fechaString}T00:00:00Z`; //se agrega T00:00:00Z para que se interprete en UTC
        const fecha = new Date(fechaStringISO);
        // Forzar la obtención del día de la semana en español en UTC
        const diaSemana = fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            timeZone: 'UTC' // Uso UTC para evitar problemas de zona horaria
        }).toLowerCase();
        console.log(diaSemana);
        // Verifica si ya existe un turno con el mismo kinesiólogo, fecha y hora
        const turnoExistente = await em.findOne(Turno, {
            kinesiologo: kinesiologo,
            fecha: fecha,
            hora: hora
        });
        if (turnoExistente) {
            throw new Error('El kinesiólogo ya tiene un turno asignado en ese horario.');
        }
        // Buscamos la disponibilidad del kinesiólogo para el día de la semana del turno
        const disponibilidad = await em.findOne(Disponibilidad, {
            kinesiologo: kinesiologo,
            diaSemana: diaSemana
        });
        if (!disponibilidad) {
            throw new Error('El kinesiólogo no tiene disponibilidad para ese día.');
        }
        // Comprobamos si la hora del turno está dentro del rango de disponibilidad
        if (hora < disponibilidad.horaInicio || hora >= disponibilidad.horaFin) {
            throw new Error(`El kinesiólogo solo está disponible entre las ${disponibilidad.horaInicio} y las ${disponibilidad.horaFin}.`);
        }
        return true;
    }),
    body('kinesiologo')
        .isInt()
        .notEmpty().withMessage('El kinesiologo es obligatorio.')
        .custom(async (value) => {
        const existe = await em.findOne(Kinesiologo, { id: value });
        if (!existe) {
            throw new Error('El kinesiologo no existe.');
        }
        return true;
    }),
    body('paciente')
        .isInt()
        .notEmpty().withMessage('El paciente es obligatorio.')
        .custom(async (value) => {
        const existe = await em.findOne(Paciente, { id: value });
        if (!existe) {
            throw new Error('El paciente no existe.');
        }
        return true;
    }),
];
//# sourceMappingURL=turno.validator.js.map
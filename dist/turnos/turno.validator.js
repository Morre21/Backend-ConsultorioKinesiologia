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
        // Convierte la fecha y hora en un objeto Date completo
        const fecha = new Date(fechaString);
        const horaInicioNueva = new Date(`${fechaString}T${hora}`);
        const horaFinNueva = new Date(horaInicioNueva);
        horaFinNueva.setHours(horaInicioNueva.getHours() + 1); // Duración del turno es 1 hora
        // Verifica si ya existe un turno que se solape con el nuevo turno
        const turnoSolapado = await em.findOne(Turno, {
            kinesiologo: kinesiologo,
            fecha: fecha,
            $or: [
                { hora: { $gte: hora, $lt: horaFinNueva.toTimeString().slice(0, 5) } },
                { hora: { $lt: hora, $gte: new Date(horaInicioNueva.setHours(horaInicioNueva.getHours() - 1)).toTimeString().slice(0, 5) } } // Turno existente termina después del nuevo turno
            ]
        });
        // Si existe un turno solapado, se lanza un error
        if (turnoSolapado) {
            throw new Error('Ya existe un turno dentro de la misma franja horaria.');
        }
        const diaSemana = fecha.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();
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
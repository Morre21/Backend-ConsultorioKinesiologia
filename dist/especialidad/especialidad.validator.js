import { body } from 'express-validator';
import { orm } from '../shared/db/orm.js';
import { Especialidad } from './especialidad.entity.js';
const em = orm.em;
export const validateEspecialidad = [
    body('nombre')
        .isString().withMessage('El nombre de la especialidad es obligatorio.')
        .notEmpty().withMessage('El nombre de la especialidad no puede estar vacío.')
        .isIn(['Deportologo', 'Osteopata', 'Traumatologia', 'Estética']).withMessage('El nombre de la especialidad no es válido.')
        .custom(async (value) => {
        const existe = await em.findOne(Especialidad, { nombre: value });
        if (!existe) {
            throw new Error('La especialidad no es válida.');
        }
        return true;
    }),
];
//# sourceMappingURL=especialidad.validator.js.map
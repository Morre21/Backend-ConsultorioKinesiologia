import { body } from 'express-validator';
import { orm } from '../shared/db/orm.js';
import { Especialidad } from './especialidad.entity.js';
const em = orm.em;
export const validateEspecialidad = [
    body('nombre')
        .isString().withMessage('El nombre de la especialidad es obligatorio.')
        .notEmpty().withMessage('El nombre de la especialidad no puede estar vacío.')
        .custom(async (value) => {
        const existe = await em.findOne(Especialidad, { nombre: value });
        if (!existe) {
            throw new Error('La especialidad no es valida.');
        }
        return true;
    }),
];
//# sourceMappingURL=especialidad.validator.js.map
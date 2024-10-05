import { body } from 'express-validator';
export const validateConsultorio = [
    body('nombre')
        .isString()
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('domicilio')
        .isString()
        .notEmpty().withMessage('La dirección es obligatoria.'),
];
//# sourceMappingURL=consultorio.validator.js.map
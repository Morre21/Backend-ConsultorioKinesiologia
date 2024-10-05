import { body } from 'express-validator';
export const validateSecretaria = [
    body('nombre')
        .isString()
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido')
        .isString()
        .notEmpty().withMessage('El apellido es obligatorio.'),
    body('dni')
        .isNumeric()
        .isLength({ min: 7, max: 8 }).withMessage('El DNI debe tener entre 7 y 8 numeros.')
        .notEmpty().withMessage('El DNI es obligatorio.'),
    body('mail')
        .isEmail().withMessage('Debe proporcionar un correo válido.')
        .notEmpty().withMessage('El mail es obligatorio.'),
    body('telefono')
        .isNumeric().withMessage('El teléfono debe ser un número.'),
    body('password')
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    })
        .withMessage('La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número'),
];
//# sourceMappingURL=secretaria.validator.js.map
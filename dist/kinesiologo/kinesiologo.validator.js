import { body } from 'express-validator';
import { validateEspecialidad } from '../especialidad/especialidad.validator.js';
export const validateKinesiologo = [
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
    body('matricula')
        .isNumeric()
        .custom((value) => { if (!value.startsWith('541')) {
        throw new Error('La matricula debe comenzar con 541');
    } return true; }) //https://express-validator.github.io/docs/guides/customizing
        .isLength({ min: 11, max: 12 })
        .notEmpty().withMessage('La matrícula es obligatoria.'),
    body('mail')
        .isEmail().withMessage('Debe proporcionar un correo válido.'),
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
    ...validateEspecialidad,
    body('consultorio')
        .isString()
        .notEmpty().withMessage('El consultorio es obligatorio.')
];
// ('TURNO')
//# sourceMappingURL=kinesiologo.validator.js.map
import { validationResult } from 'express-validator';
function validarErrores(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: 'Error de validación',
            errors: errors.array(),
        });
        return;
    }
    next();
}
export { validarErrores };
//# sourceMappingURL=validacionErrores.js.map
import { Router } from 'express';
import { login, logout } from '../kinesiologo/kinesiologo.auth.controller.js'; // Asegúrate de crear este archivo
import { validarErrores } from '../middlewares/validacionErrores.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);

export { authRouter };

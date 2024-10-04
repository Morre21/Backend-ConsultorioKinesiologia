import { Router } from 'express';
import { login, logout } from '../kinesiologo/kinesiologo.auth.controller.js'; 
import { validarErrores } from '../middlewares/validacionErrores.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);

export { authRouter };

import { Router } from 'express';
import { login, logout } from '../kinesiologo/kinesiologo.auth.controller.js';
const authRouter = Router();
authRouter.post('/login', login);
authRouter.post('/logout', logout);
export { authRouter };
//# sourceMappingURL=auth.routes.js.map
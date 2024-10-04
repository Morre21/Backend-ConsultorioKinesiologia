import { Router } from "express";
import { sanitizeTurnoInput, findAll, findOne, add, update, remove } from "./turno.controler.js";
export const turnoRouter = Router();
turnoRouter.get('/', findAll);
turnoRouter.get('/:id', findOne);
turnoRouter.post('/', sanitizeTurnoInput, add);
turnoRouter.put('/:id', sanitizeTurnoInput, update);
turnoRouter.patch('/:id', sanitizeTurnoInput, update);
turnoRouter.delete('/:id', remove);
//# sourceMappingURL=turno.routes.js.map
//Acá hacemos una especie de índice por cada módulo
import { Router } from 'express';
import { sanitizeKinesiologoInput, findAll, findOne, add, update, remove} from "./kinesiologo.controler.js";

export const kinesiologoRouter = Router()

/*Le definimos el directorio raiz, porque si queremos hacer una modificación.
De esta manera no queda atada y podemos utilizar la ruta que necesitemos en app.ts 
*/
kinesiologoRouter.get('/', findAll)
kinesiologoRouter.get('/:id', findOne)
kinesiologoRouter.post('/',sanitizeKinesiologoInput, add)
kinesiologoRouter.put('/:id',sanitizeKinesiologoInput, update)
kinesiologoRouter.patch('/:id',sanitizeKinesiologoInput, update)
kinesiologoRouter.delete('/:id', remove)

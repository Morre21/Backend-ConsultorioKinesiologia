import { Secretaria } from './secretaria.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
function sanitizeSecretariaInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        mail: req.body.mail,
        contraseña: req.body.contraseña,
        telefono: req.body.telefono,
        dni: req.body.dni,
        consultorio: req.body.consultorio,
    };
    //more checks here
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const secretarias = await em.find(Secretaria, {}, { populate: ['consultorio'] });
        res.status(200).json({ message: 'Todas las secretarias encontradas', data: secretarias });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const secretaria = await em.findOneOrFail(Secretaria, { id }, { populate: ['consultorio'] });
        res.status(200).json({ message: 'Secretaria encontrada con exito', data: secretaria });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const secretaria = em.create(Secretaria, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Secretaria creada exitosamente', data: secretaria });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const secretariaToUpdate = await em.findOneOrFail(Secretaria, { id });
        em.assign(secretariaToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Secretaria modificada exitosamente', data: secretariaToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const secretaria = em.getReference(Secretaria, id);
        await em.removeAndFlush(secretaria);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeSecretariaInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=secretaria.controler.js.map
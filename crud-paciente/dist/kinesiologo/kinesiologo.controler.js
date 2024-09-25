import { Kinesiologo } from './kinesiologo.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
function sanitizeKinesiologoInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        matricula: req.body.matricula,
        mail: req.body.mail,
        telefono: req.body.telefono,
        password: req.body.password,
        especialidad: req.body.especialidad,
        consultorio: req.body.consultorio,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const kinesiologos = await em.find(Kinesiologo, {}, { populate: ['especialidad', 'consultorio'] });
        res.status(200).json({ message: 'Todos los kinesiologos encontrados', data: kinesiologos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const kinesiologos = await em.findOneOrFail(Kinesiologo, { id }, { populate: ['especialidad', 'consultorio'] });
        res.status(200).json({ message: 'Kinesiologo encontrado con exito', data: kinesiologos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const kinesiologo = em.create(Kinesiologo, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Kinesiologo creado exitosamente', data: kinesiologo });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const kinesiologoToUpdate = await em.findOneOrFail(Kinesiologo, { id });
        em.assign(kinesiologoToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Kinesiologo modificado exitosamente', data: kinesiologoToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const kinesiologo = em.getReference(Kinesiologo, id);
        await em.removeAndFlush(kinesiologo);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeKinesiologoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=kinesiologo.controler.js.map
import { Disponibilidad } from './dispo.enitity.js';
import { orm } from '../shared/db/orm.js';
import { Kinesiologo } from '../kinesiologo/kinesiologo.entity.js';
const em = orm.em;
function sanitizedInput(req, res, next) {
    req.body.sanitizedInput = {
        fechaDesde: req.body.fechaDesde,
        diaSemana: req.body.diaSemana,
        horaInicio: req.body.horaInicio,
        horaFin: req.body.horaFin,
        kinesiologo: req.body.kinesiologo,
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
        const disponibilidad = await em.find(Disponibilidad, {}, { populate: ['kinesiologo'] });
        res.status(200).json({ message: 'Todas las disponibilidades fueron encontradas', data: disponibilidad });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const disponibilidad = await em.findOneOrFail(Disponibilidad, { id }, { populate: ['kinesiologo'] });
        res.status(200).json({ message: 'Disponibilidad encontrada con exito', data: disponibilidad });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        // Primero, busca el kinesiólogo por su matrícula
        const kinesiologo = await em.findOne(Kinesiologo, { matricula: req.body.sanitizedInput.kinesiologo });
        if (!kinesiologo) {
            return res.status(404).json({ message: 'Kinesiólogo no encontrado' });
        }
        // Crea un nuevo objeto con los datos de disponibilidad, reemplazando kinesiologo con la referencia encontrada
        const disponibilidadData = {
            ...req.body.sanitizedInput,
            kinesiologo: kinesiologo
        };
        const disponibilidad = em.create(Disponibilidad, disponibilidadData);
        await em.flush();
        res.status(201).json({ message: 'Disponibilidad creada exitosamente', data: disponibilidad });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const disponibilidadToUpdate = await em.findOneOrFail(Disponibilidad, { id });
        em.assign(disponibilidadToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Disponibilidad modificada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const disponibilidad = em.getReference(Disponibilidad, id);
        await em.removeAndFlush(disponibilidad);
        res.status(200).send({ message: 'Disponibilidad borrada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizedInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=dispo.controller.js.map
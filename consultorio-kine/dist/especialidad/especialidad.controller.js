import { orm } from '../shared/db/orm.js';
import { Especialidad } from './especialidad.entity.js';
const em = orm.em;
const especialidades = [
    { nombre: 'Deportologo' },
    { nombre: 'Osteopata' },
    { nombre: 'Traumatologia' },
    { nombre: 'Estética' },
];
async function DefinoEspecialidades() {
    for (const especialidad of especialidades) {
        const existe = await em.findOne(Especialidad, { nombre: especialidad.nombre });
        if (!existe) {
            em.create(Especialidad, especialidad);
        }
    }
    await em.flush();
}
async function findAll(req, res) {
    try {
        const especialidad = await em.find(Especialidad, {});
        res.status(200).json({ message: 'Todas las especialidades fueron encontradas', data: especialidad });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const especialidad = await em.findOneOrFail(Especialidad, { id });
        res.status(200).json({ message: 'Especialidad encontrada exitosamente', data: especialidad });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const especialidad = em.create(Especialidad, req.body);
        await em.flush();
        res.status(201).json({ message: 'Especialidad creada exitosamente', data: especialidad });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const especialidad = em.getReference(Especialidad, id);
        em.assign(especialidad, req.body);
        await em.flush();
        res.status(200).json({ message: 'Especialidad modificada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const especialidad = em.getReference(Especialidad, id);
        await em.removeAndFlush(especialidad);
        res.status(200).send({ message: 'Especialidad borrada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findOne, add, update, remove, DefinoEspecialidades };
//# sourceMappingURL=especialidad.controller.js.map
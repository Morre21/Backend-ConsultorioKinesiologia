import { Paciente } from "./paciente.entity.js";
import { orm } from '../shared/db/orm.js';
const em = orm.em;
async function findAll(req, res) {
    try {
        const pacientes = await em.find(Paciente, {});
        res.status(200).json({ message: 'Todos los pacientes encontrados', data: pacientes });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const paciente = await em.findOneOrFail(Paciente, { id });
        res.status(200).json({ message: 'Paciente encontrado exitosamente', data: paciente });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const paciente = em.create(Paciente, req.body);
        await em.flush();
        res.status(201).json({ message: 'Paciente creado exitosamente', data: paciente });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const paciente = em.getReference(Paciente, id);
        em.assign(paciente, req.body);
        await em.flush();
        res.status(200).json({ message: 'Paciente modificado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const paciente = em.getReference(Paciente, id);
        await em.removeAndFlush(paciente);
        res.status(200).send({ message: 'Paciente borrado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=paciente.controler.js.map
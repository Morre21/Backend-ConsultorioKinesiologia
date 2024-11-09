import { orm } from '../shared/db/orm.js';
import { Especialidad } from './especialidad.entity.js';
import { Consultorio } from '../consultorio/consultorio.entity.js';
const em = orm.em;
async function findAll(req, res) {
    try {
        const especialidad = await em.find(Especialidad, {});
        res
            .status(200)
            .json({
            message: 'Todas las especialidades fueron encontradas',
            data: especialidad,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const especialidad = await em.findOneOrFail(Especialidad, { id });
        res
            .status(200)
            .json({
            message: 'Especialidad encontrada exitosamente',
            data: especialidad,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const especialidad = em.create(Especialidad, req.body);
        await em.flush();
        res
            .status(201)
            .json({
            message: 'Especialidad creada exitosamente',
            data: especialidad,
        });
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
// Controlador de Especialidad
async function findKinesiologosByEspecialidad(req, res) {
    try {
        const especialidadId = Number(req.params.especialidadId);
        const consultorioId = Number(req.params.consultorioId);
        if (!especialidadId || !consultorioId) {
            return res
                .status(400)
                .json({
                message: 'Debe proporcionar el ID de la especialidad y del consultorio',
            });
        }
        const especialidad = await em.findOne(Especialidad, { id: especialidadId }, { populate: ['Kinesiologos'] });
        const consultorio = await em.findOne(Consultorio, { id: consultorioId }, { populate: ['Kinesiologos'] });
        if (!especialidad || !consultorio) {
            return res
                .status(404)
                .json({ message: 'Especialidad o consultorio no encontrado' });
        }
        const kinesiologos = especialidad.Kinesiologos.filter((kinesiologo) => consultorio.Kinesiologos.contains(kinesiologo));
        res
            .status(200)
            .json({ message: 'Kinesiólogos encontrados', data: kinesiologos });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: 'Error al obtener kinesiólogos', error: error.message });
    }
}
export { findAll, findOne, add, update, remove, findKinesiologosByEspecialidad, };
//# sourceMappingURL=especialidad.controler.js.map
import { Turno } from "./turno.entity.js";
import { orm } from '../shared/db/orm.js';
import { Disponibilidad } from "../disponibilidad/dispo.enitity.js";
const em = orm.em;
function sanitizeTurnoInput(req, res, next) {
    req.body.sanitizedInput = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        estado: req.body.estado,
        importeTotal: req.body.importeTotal,
        paciente: req.body.paciente,
        kinesiologo: req.body.kinesiologo,
        tipoAtencion: req.body.tipoAtencion,
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
        const turnos = await em.find(Turno, {}, { populate: ['paciente', 'kinesiologo', 'tipoAtencion'] });
        res.status(200).json({ message: 'Todos los turnos encontrados', data: turnos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const turno = await em.findOneOrFail(Turno, { id }, { populate: ['paciente', 'kinesiologo', 'tipoAtencion'] });
        res.status(200).json({ message: 'Turno encontardo con exito', data: turno });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const { fecha, horaDesde, kinesiologo, tipoAtencion } = req.body.sanitizedInput;
        const existeTurno = await em.findOne(Turno, { fecha, horaDesde, kinesiologo });
        if (existeTurno) {
            res.status(400).json({ message: 'Ya existe un turno para ese kinesiologo en ese horario' });
            return;
        }
        const disponibilidad = await em.findOne(Disponibilidad, { fecha, horaDesde, kinesiologo, tipoAtencion });
        if (!disponibilidad) {
            res.status(400).json({ message: 'Turno no disponible' });
            return;
        }
        const turno = em.create(Turno, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Turno creado exitosamente', data: turno });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const turnoToUpdate = await em.findOneOrFail(Turno, { id });
        em.assign(turnoToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Turno modificado exitosamente', data: turnoToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const turno = em.getReference(Turno, id);
        await em.removeAndFlush(turno);
        res.status(200).send({ message: 'Turno borrado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeTurnoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=turno.controller.js.map
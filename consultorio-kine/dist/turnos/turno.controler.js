import { TurnoRepository } from "./turno.repository.js";
import { Turno } from "./turno.entity.js";
const repository = new TurnoRepository();
function sanitizeTurnoInput(req, res, next) {
    req.body.sanitizedInput = {
        fecha: req.body.fecha,
        hora: req.body.hora,
        estado: req.body.estado,
        importeTotal: req.body.importeTotal,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function findOne(req, res) {
    const id = req.params.id;
    const turno = await repository.findOne({ id });
    if (!turno) {
        return res.status(404).send({ message: 'Turno not found' });
    }
    res.json({ data: turno });
}
async function add(req, res) {
    const { fecha, hora, estado, importeTotal, } = req.body;
    const turnoImput = new Turno(fecha, hora, estado, importeTotal);
    const newTurno = await repository.add(turnoImput);
    res.status(201).send({ message: "Turno created ", data: newTurno });
}
async function update(req, res) {
    const turno = await repository.update(req.params.id, req.body.sanitizedInput);
    if (!turno) {
        return res.status(404).send({ message: 'Turno not found' });
    }
    return res.status(200).send({ message: 'Turno updated successfully', data: turno });
}
async function remove(req, res) {
    const id = req.params.id;
    const turno = await repository.delete({ id });
    if (!turno) {
        res.status(404).send({ message: 'turno not found' });
    }
    else {
        res.status(200).send({ message: 'turno deleted successfully' });
    }
}
export { sanitizeTurnoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=turno.controler.js.map
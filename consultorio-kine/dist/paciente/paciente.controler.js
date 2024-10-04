import { PacienteRepository } from "./paciente.repository.js";
import { Paciente } from "./paciente.entity.js";
//El controler tiene toda la lógica de negocio 
const repository = new PacienteRepository();
function sanitizePacienteInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        fechaNacimiento: req.body.fechaNacimiento,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password,
        obraSocial: req.body.obraSocial,
        estado: req.body.estado
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
    // lo que hago en las lineas de abajo es pasarle un objeto
    const id = req.params.id;
    const paciente = await repository.findOne({ id });
    if (!paciente) {
        return res.status(404).send({ message: 'paciente not found' });
    }
    res.json({ data: paciente });
}
async function add(req, res) {
    const input = req.body.sanitizedInput;
    const pacienteInput = new Paciente(input.nombre, input.apellido, input.dni, input.fechaNacimiento, input.email, input.telefono, input.password, input.estado, input.obraSocial);
    const paciente = await repository.add(pacienteInput);
    return res.status(201).send({ message: 'paciente created', data: paciente });
}
async function update(req, res) {
    const paciente = await repository.update(req.params.id, req.body.sanitizedInput);
    if (!paciente) {
        return res.status(404).send({ message: 'paciente not found' });
    }
    return res.status(200).send({ message: 'paciente updated successfully', data: paciente });
}
async function remove(req, res) {
    const id = req.params.id;
    const paciente = await repository.delete({ id });
    if (!paciente) {
        res.status(404).send({ message: 'paciente not found' });
    }
    else {
        res.status(200).send({ message: 'paciente deleted successfully' });
    }
}
/*Podría crear un objeto con todas estas funciones a exportar, así:

export const controler = {
    sanitizeCharacterInput,
    findAll,
    findOne,
} */
export { sanitizePacienteInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=paciente.controler.js.map
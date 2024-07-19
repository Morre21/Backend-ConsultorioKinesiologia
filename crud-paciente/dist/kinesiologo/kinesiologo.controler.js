import { KinesiologoRepository } from "./kinesiologo.repository.js";
import { Kinesiologo } from "./kinesiologo.entity.js";
//El controler tiene toda la lógica de negocio 
const repository = new KinesiologoRepository();
function sanitizeKinesiologoInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        especialidad: req.body.especialidad,
        apellido: req.body.apellido,
        dni: req.body.dni,
        matricula: req.body.matricula,
        mail: req.body.mail,
        telefono: req.body.telefono,
        password: req.body.password,
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
    const kinesiologo = await repository.findOne({ id });
    if (!kinesiologo) {
        return res.status(404).send({ message: 'kinesiologo not found' });
    }
    res.json({ data: kinesiologo });
}
async function add(req, res) {
    const input = req.body.sanitizedInput;
    const kinesiologoInput = new Kinesiologo(input.nombre, input.especialidad, input.apellido, input.dni, input.matricula, input.mail, input.telefono, input.password);
    const kinesiologo = await repository.add(kinesiologoInput);
    return res.status(201).send({ message: 'kinesiologo created', data: kinesiologo });
}
async function update(req, res) {
    const kinesiologo = await repository.update(req.params.id, req.body.sanitizedInput);
    if (!kinesiologo) {
        return res.status(404).send({ message: 'kinesiologo not found' });
    }
    return res.status(200).send({ message: 'kinesiologo updated successfully', data: kinesiologo });
}
async function remove(req, res) {
    const id = req.params.id;
    const kinesiologo = await repository.delete({ id });
    if (!kinesiologo) {
        res.status(404).send({ message: 'kinesiologo not found' });
    }
    else {
        res.status(200).send({ message: 'kinesiologo deleted successfully' });
    }
}
/*Podría crear un objeto con todas estas funciones a exportar, así:

export const controler = {
    sanitizeCharacterInput,
    findAll,
    findOne,
} */
export { sanitizeKinesiologoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=kinesiologo.controler.js.map
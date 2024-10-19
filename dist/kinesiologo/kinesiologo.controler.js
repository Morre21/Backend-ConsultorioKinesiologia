import { Kinesiologo } from './kinesiologo.entity.js';
import { orm } from '../shared/db/orm.js';
import { hashPassword } from '../auth/auth.js';
import { Especialidad } from '../especialidad/especialidad.entity.js';
import { Consultorio } from '../consultorio/consultorio.entity.js';
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
        const kinesiologos = await em.find(Kinesiologo, {}, { populate: ['consultorio', 'especialidad'] });
        res.status(200).json({ message: 'Todos los kinesiologos encontrados', data: kinesiologos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const kinesiologos = await em.findOneOrFail(Kinesiologo, { id }, { populate: ['consultorio', 'especialidad'] });
        res.status(200).json({ message: 'Kinesiologo encontrado con exito', data: kinesiologos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        // Verificar si el Kinesiologo ya existe
        const existingKinesiologo = await em.findOne(Kinesiologo, { dni: req.body.sanitizedInput.dni });
        if (existingKinesiologo) {
            return res.status(400).json({ message: 'El Kinesiologo ya existe' });
        }
        // Buscar el ID de la especialidad
        const especialidad = await em.findOne(Especialidad, { nombre: req.body.especialidad });
        if (!especialidad) {
            return res.status(400).json({ message: 'Especialidad no encontrada' });
        }
        // Buscar el ID del consultorio
        const consultorio = await em.findOne(Consultorio, { nombre: req.body.consultorio });
        if (!consultorio) {
            return res.status(400).json({ message: 'Consultorio no encontrado' });
        }
        const hashedPassword = await hashPassword(req.body.sanitizedInput.password);
        // Asigno a la constante data el hash de la contraseña, Id de especialidad y Id de consultorio
        const kinesiologoData = {
            ...req.body.sanitizedInput,
            consultorio: consultorio.id,
            especialidad: especialidad.id,
            password: hashedPassword
        };
        // Creo el kinesiologo pasandole como parametro la constante kinesiologoData  
        const kinesiologo = em.create(Kinesiologo, kinesiologoData);
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
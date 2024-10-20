import { Secretaria } from './secretaria.entity.js';
import { orm } from '../shared/db/orm.js';
import { comparePassword, hashPassword } from '../middlewares/authPass.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const em = orm.em;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
function sanitizeSecretariaInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        mail: req.body.mail,
        contraseña: req.body.contraseña,
        telefono: req.body.telefono,
        dni: req.body.dni,
        consultorio: req.body.consultorio,
    };
    //more checks here
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function login(req, res) {
    const { mail, contraseña } = req.body;
    try {
        const secretaria = await em.findOne(Secretaria, { mail });
        if (!secretaria) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        const isPasswordValid = await comparePassword(contraseña, secretaria.contraseña);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: secretaria.id }, JWT_SECRET, {
            expiresIn: '1h',
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
}
async function findAll(req, res) {
    try {
        const secretarias = await em.find(Secretaria, {}, { populate: ['consultorio'] });
        res.status(200).json({
            message: 'Todas las secretarias encontradas',
            data: secretarias,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const secretaria = await em.findOneOrFail(Secretaria, { id }, { populate: ['consultorio'] });
        res
            .status(200)
            .json({ message: 'Secretaria encontrada con exito', data: secretaria });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        // Verificar si el Secretaria ya existe
        const existingSecretaria = await em.findOne(Secretaria, {
            dni: req.body.sanitizedInput.dni,
        });
        if (existingSecretaria) {
            return res.status(400).json({ message: 'El Secretaria ya existe' });
        }
        const hashedPassword = await hashPassword(req.body.sanitizedInput.contraseña);
        // Asigno a la constante data el hash de la contraseña
        const secretarialogoData = {
            ...req.body.sanitizedInput,
            contraseña: hashedPassword,
        };
        // Creo secretaria pasandole como parametro la constante secretarialogoData
        const secretaria = em.create(Secretaria, secretarialogoData);
        await em.flush();
        res
            .status(201)
            .json({ message: 'Secretaria creada exitosamente', data: secretaria });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const secretariaToUpdate = await em.findOneOrFail(Secretaria, { id });
        em.assign(secretariaToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({
            message: 'Secretaria modificada exitosamente',
            data: secretariaToUpdate,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const secretaria = em.getReference(Secretaria, id);
        await em.removeAndFlush(secretaria);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeSecretariaInput, findAll, findOne, add, update, remove, login, logout, };
//# sourceMappingURL=secretaria.controler.js.map
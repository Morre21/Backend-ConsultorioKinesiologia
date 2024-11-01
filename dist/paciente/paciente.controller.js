import { Paciente } from './paciente.entity.js';
import { orm } from '../shared/db/orm.js';
import { hashPassword, comparePassword } from '../middlewares/authPass.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const em = orm.em;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
function sanitizePacienteInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        fechaNacimiento: req.body.fechaNacimiento,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password,
        estado: req.body.estado,
        obraSocial: req.body.obraSocial,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const paciente = await em.findOne(Paciente, { email });
        if (!paciente) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        const isPasswordValid = await comparePassword(password, paciente.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: paciente.id }, JWT_SECRET, {
            expiresIn: '1h',
        });
        // Establece el token en una cookie segura
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000, // 1 hora
        });
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            data: { email: paciente.email },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
}
async function findAll(req, res) {
    try {
        const pacientes = await em.find(Paciente, {});
        res
            .status(200)
            .json({ message: 'Todos los pacientes encontrados', data: pacientes });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const paciente = await em.findOneOrFail(Paciente, { id });
        res
            .status(200)
            .json({ message: 'Paciente encontrado exitosamente', data: paciente });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        // Verificar si el paciente ya existe
        const existingPaciente = await em.findOne(Paciente, {
            dni: req.body.sanitizedInput.dni,
        });
        if (existingPaciente) {
            return res.status(400).json({ message: 'El paciente ya existe' });
        }
        const hashedPassword = await hashPassword(req.body.sanitizedInput.password);
        const PacienteData = {
            ...req.body.sanitizedInput,
            password: hashedPassword,
        };
        const paciente = em.create(Paciente, PacienteData);
        await em.flush();
        res
            .status(201)
            .json({ message: 'Paciente creado exitosamente', data: paciente });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const paciente = em.getReference(Paciente, id);
        em.assign(paciente, req.body.sanitizedInput);
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
export { sanitizePacienteInput, findAll, findOne, add, update, remove, login, logout, };
//# sourceMappingURL=paciente.controller.js.map
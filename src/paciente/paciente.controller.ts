import { Request, Response, NextFunction } from 'express';
import { Paciente } from './paciente.entity.js';
import { orm } from '../shared/db/orm.js';
import { hashPassword, comparePassword } from '../middlewares/authPass.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const em = orm.em;

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

function sanitizePacienteInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

async function login(req: Request, res: Response) {
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
      httpOnly: true, // El token solo puede ser accedido desde el servidor
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      sameSite: 'strict', // Previene que el token sea enviado en requests cross-site
      maxAge: 3600000, // 1 hora
    });
    
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      data: { email: paciente.email },
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function logout(req: Request, res: Response) {
  res.clearCookie('token');
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
}

async function findAll(req: Request, res: Response) {
  try {
    const pacientes = await em.find(Paciente, {});
    res
      .status(200)
      .json({ message: 'Todos los pacientes encontrados', data: pacientes });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const paciente = await em.findOneOrFail(Paciente, { id });
    res
      .status(200)
      .json({ message: 'Paciente encontrado exitosamente', data: paciente });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const paciente = em.getReference(Paciente, id);
    em.assign(paciente, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Paciente modificado exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const paciente = em.getReference(Paciente, id);
    await em.removeAndFlush(paciente);
    res.status(200).send({ message: 'Paciente borrado exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
export {
  sanitizePacienteInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  login,
  logout,
};

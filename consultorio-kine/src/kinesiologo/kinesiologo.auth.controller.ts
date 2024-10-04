import { Request, Response } from 'express';
import { Kinesiologo } from './kinesiologo.entity.js'; 
import { orm } from '../shared/db/orm.js';
import { hashPassword, comparePassword } from '../auth.js';
import jwt from 'jsonwebtoken';

const em = orm.em;

// Función para iniciar sesión
export async function login(req: Request, res: Response) {
  try {
    const { matricula, password } = req.body;

    const kinesiologo = await em.findOne(Kinesiologo, { matricula });

    if (!kinesiologo) {
      return res.status(401).json({ message: ' No  valido' });
    }

    const isPasswordValid = await comparePassword(password, kinesiologo.contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Pass no validas' });
    }

    // Crear el token JWT
    const token = jwt.sign({ id: kinesiologo.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 

    // Guarda el token en una cookie
    res.cookie('token', token, { httpOnly: true, secure: true }); 
    res.status(200).json({ message: 'Inicio de sesión exitoso', data: { matricula: kinesiologo.matricula } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Función para cerrar sesión
export async function logout(req: Request, res: Response) {
  res.clearCookie('token'); 
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
}

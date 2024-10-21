import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

declare global {
  namespace Express {
    interface Request {
      user?: any;  // Ajusta `any` al tipo de tu usuario, si lo conoces
    }
  }
}

export function authToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token; // Obtén el token de las cookies

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acceso denegado. No se encontró el token.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido.' });
  }
}

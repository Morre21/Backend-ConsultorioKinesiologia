import { Kinesiologo } from './kinesiologo.entity.js';
import { orm } from '../shared/db/orm.js';
import { comparePassword } from '..//auth/auth.js';
import jwt from 'jsonwebtoken';
const em = orm.em;
// Función para iniciar sesión
export async function login(req, res) {
    try {
        const { matricula, password } = req.body;
        const kinesiologo = await em.findOne(Kinesiologo, { matricula });
        if (!kinesiologo) {
            res.status(401).json({ message: ' No  valido' });
            return;
        }
        const isPasswordValid = await comparePassword(password, kinesiologo.contraseña);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Pass no validas' });
            return;
        }
        // Verifica que JWT_SECRET esté definido
        if (!process.env.JWT_SECRET) {
            res.status(500).json({ message: 'JWT_SECRET no está definido' });
            return;
        }
        // Crear el token JWT
        const token = jwt.sign({ id: kinesiologo.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Guarda el token en una cookie
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({ message: 'Inicio de sesión exitoso', data: { matricula: kinesiologo.matricula } });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Error desconocido' });
        }
    }
}
// Función para cerrar sesión
export async function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
}
//# sourceMappingURL=kinesiologo.auth.controller.js.map
import { insertarUsuario, obtenerUsuarioPorEmail, obtenerUsuarioPorId } from '../models/usuarios.model.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * Registra un nuevo usuario.
 *
 * @param {import('express').Request} req - Solicitud HTTP que contiene los datos del usuario en `req.body`.
 * @param {import('express').Response} res - Respuesta HTTP utilizada para confirmar el registro o devolver un error.
 * @returns {Promise<void>} Finaliza la respuesta HTTP después de completar el registro.
 * @throws {Error} Si ocurre un error distinto de un email duplicado.
 */
const registro = async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password);
    try {
        const id = await insertarUsuario(req.body);
        const usuario = await obtenerUsuarioPorId(id)
        res.json({ message: 'Usuario registrado correctamente', usuario});
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'El email ya esta registrado' });
        }
        throw new Error( error.message );
    }
}

/**
 * Autentica un usuario mediante email y contraseña.
 *
 * @param {import('express').Request} req - Solicitud HTTP que contiene `email` y `password` en `req.body`.
 * @param {import('express').Response} res - Respuesta HTTP que devuelve el token JWT o el motivo del rechazo.
 * @returns {Promise<void>} Finaliza la respuesta HTTP con el resultado del inicio de sesión.
 * @throws {Error} Si se produce un error al consultar o validar el usuario.
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await obtenerUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
        if (usuario.esta_activo === 0) {
            return res.status(401).json({ message: 'Usuario desactivado' });
        }
        const iguales = await bcrypt.compare(password, usuario.password);
        if (!iguales) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
        res.json({ message: 'Login exitoso',
            token: jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
         });
    } catch (error) {
        throw new Error( error.message );
    }

}

export { registro, login }
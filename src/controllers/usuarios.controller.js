import { insertarUsuario, obtenerUsuarioPorEmail, obtenerUsuarioPorId, actualizarUsuario, borrarUsuario } from '../models/usuarios.model.js';

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
        await insertarUsuario(req.body);
        res.json({ message: 'Usuario registrado correctamente'});
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

/**
 * Obtiene el perfil del usuario autenticado.
 *
 * @param {import('express').Request} req - Solicitud HTTP que contiene el usuario autenticado en `req.usuario`.
 * @param {import('express').Response} res - Respuesta HTTP con los datos del perfil.
 * @returns {Promise<void>} Finaliza la respuesta HTTP con el perfil solicitado.
 * @throws {Error} Si ocurre un error al obtener el usuario.
 */
const perfil = async (req, res) => {
    try {
        const usuario = await obtenerUsuarioPorId(req.usuario.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Perfil obtenido correctamente', usuario });
    } catch (error) {
        throw new Error( error.message );
    }
}

/**
 * Actualiza los datos editables del perfil del usuario autenticado.
 *
 * @param {import('express').Request} req - Solicitud HTTP con el identificador del usuario y los datos a actualizar.
 * @param {import('express').Response} res - Respuesta HTTP con el perfil actualizado.
 * @returns {Promise<void>} Finaliza la respuesta HTTP después de actualizar y consultar el perfil.
 * @throws {Error} Si ocurre un error al actualizar o recuperar el usuario.
 */
const actualizarPerfil = async (req, res) => {
    const { id } = req.usuario;
    const { nombre, apellidos, username, email, foto } = req.body;
    await actualizarUsuario(id, { nombre, apellidos, username, email, foto });
    const usuario = await obtenerUsuarioPorId(id);
    res.json({ message: 'Perfil actualizado correctamente' , usuario});
}

/**
 * Desactiva el perfil del usuario autenticado.
 *
 * @param {import('express').Request} req - Solicitud HTTP que contiene el usuario autenticado en `req.usuario`.
 * @param {import('express').Response} res - Respuesta HTTP utilizada para confirmar la desactivación.
 * @returns {Promise<void>} Finaliza la respuesta HTTP después de desactivar el perfil.
 * @throws {Error} Si ocurre un error al desactivar el usuario.
 */
const borrarPerfil = async (req, res) => {
    const { id } = req.usuario;
    await borrarUsuario(id);
    res.json({ message: 'Perfil borrado correctamente' });
}

export { registro, login, perfil, actualizarPerfil, borrarPerfil };
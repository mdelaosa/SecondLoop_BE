import jwt from 'jsonwebtoken';

import { obtenerUsuarioPorId } from '../models/usuarios.model.js';

/**
 * Verifica el token JWT y agrega el usuario autenticado a la solicitud.
 *
 * @param {import('express').Request} req - Solicitud HTTP que debe incluir el token en el encabezado `Authorization`.
 * @param {import('express').Response} res - Respuesta HTTP utilizada para rechazar solicitudes no autenticadas.
 * @param {import('express').NextFunction} next - Función que continúa con el siguiente middleware o controlador.
 * @returns {Promise<void>} Continúa con la solicitud o finaliza la respuesta con un error de autenticación.
 * @throws {Error} Si ocurre un error inesperado al consultar el usuario.
 */
const authToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }

    const { authorization: token } = req.headers;

    let data
    try{
        data = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(403).json({ message: 'Token de autenticación inválido' });
    }
    
    const usuario = await obtenerUsuarioPorId(data.id);
    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (usuario.esta_activo === 0) {
        return res.status(404).json({ message: 'Usuario no activo' });
    }
    
    req.usuario = usuario;

    next();
};

export { authToken };
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
        return res.status(403).json({ message: 'No se proporcionó un token de autenticación' });
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
        return res.status(403).json({ message: 'Usuario no encontrado' });
    }

    if (usuario.esta_activo === 0) {
        return res.status(403).json({ message: 'Usuario no activo' });
    }
    
    req.usuario = usuario;

    next();
}

/**
 * Crea un middleware que verifica si el usuario autenticado tiene el rol requerido.
 *
 * @param {string} rol - Nombre del rol necesario para acceder a la ruta.
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => void}
 * Middleware de Express que autoriza al usuario o devuelve un error 403.
 */
const checkRol = (rol) => {
    return (req, res, next) => {
        if (req.usuario.rol !== rol) {
            return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
        }
        next();
    };
};


export { authToken, checkRol };
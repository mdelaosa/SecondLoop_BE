import { obtenerUsuarioPorId } from '../models/usuarios.model.js';

/**
 * Crea un middleware que verifica si el usuario autenticado tiene el rol requerido.
 *
 * @param {string} rol - Nombre del rol necesario para acceder a la ruta.
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => void}
 * Middleware de Express que autoriza al usuario o devuelve un error 403.
 */
const checkRol = (rol) => {
    return (req, res, next) => {
        if (!rol.includes(req.usuario.rol)) {
            return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
        }
        next();
    };
};

/**
 * Comprueba que el usuario identificado por el parámetro de ruta existe.
 *
 * @param {import('express').Request} req - Solicitud HTTP que contiene el identificador del usuario en `req.params.id`.
 * @param {import('express').Response} res - Respuesta HTTP utilizada para devolver un error si el usuario no existe.
 * @param {import('express').NextFunction} next - Función que continúa con el siguiente middleware o controlador.
 * @returns {Promise<void>} Continúa con la solicitud o finaliza la respuesta si el usuario no existe.
 * @throws {Error} Si ocurre un error al consultar el usuario.
 */
const checkUsuarioId = async (req, res, next) => {
    const { id } = req.params;
    const usuario = await obtenerUsuarioPorId(id);

    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    next();
};

export { checkRol, checkUsuarioId };
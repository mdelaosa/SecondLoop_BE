import { obtenerUsuarioPorId, actualizarUsuario, borrarUsuario, cambiarEstado, cambiarRol, obtenerArticulos } from '../models/usuarios.model.js';

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
    res.json({ message: 'Perfil borrado correctamente', usuario: req.usuario });
}

/**
 * Cambia el estado activo de un usuario administrador.
 *
 * @param {import('express').Request} req - Solicitud HTTP con el identificador en `req.params.id` y el estado en `req.body.estado`.
 * @param {import('express').Response} res - Respuesta HTTP con el usuario actualizado o un error de validación.
 * @returns {Promise<void>} Finaliza la respuesta HTTP después de actualizar el estado.
 * @throws {Error} Si ocurre un error al actualizar o consultar el usuario.
 */
const cambiarEstadoUsuario = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    if (estado !== 0 && estado !== 1) {
        return res.status(400).json({ message: 'Estado inválido. Debe ser 0 o 1.' });
    }
    await cambiarEstado(id, estado);
    const usuario = await obtenerUsuarioPorId(id);
    res.json({ message: 'Estado del usuario actualizado correctamente', usuario });
}

/**
 * Cambia el rol asignado a un usuario.
 *
 * @param {import('express').Request} req - Solicitud HTTP con el identificador en `req.params.id` y el rol en `req.body.rol`.
 * @param {import('express').Response} res - Respuesta HTTP con el usuario actualizado.
 * @returns {Promise<void>} Finaliza la respuesta HTTP después de actualizar el rol.
 * @throws {Error} Si ocurre un error al actualizar o consultar el usuario.
 */
const cambiarRolUsuario = async (req, res) => {
    const { id } = req.params;
    const { rol } = req.body;
    await cambiarRol(id, rol);
    const usuario = await obtenerUsuarioPorId(id);
    res.json({ message: 'Rol del usuario actualizado correctamente', usuario });
}

/**
 * Obtiene los artículos publicados por un usuario.
 *
 * @param {import('express').Request} req - Solicitud HTTP que contiene el identificador del usuario en `req.params.id`.
 * @param {import('express').Response} res - Respuesta HTTP con la lista de artículos del usuario.
 * @returns {Promise<void>} Finaliza la respuesta HTTP con los artículos encontrados.
 * @throws {Error} Si ocurre un error al consultar los artículos.
 */
const obtenerArticulosUsuario = async (req, res) => {
    const { id } = req.params;
    const articulos = await obtenerArticulos(id);
            res.json({ message: 'Artículos del usuario obtenidos correctamente', articulos });
}



export { perfil, actualizarPerfil, borrarPerfil, cambiarEstadoUsuario, cambiarRolUsuario, obtenerArticulosUsuario };
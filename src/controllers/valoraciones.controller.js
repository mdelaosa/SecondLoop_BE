import { obtenerValoraciones, publicarValoracion, borrarValoracion, obtenerValoracionPorId } from '../models/valoraciones.model.js';

/**
 * Obtiene las valoraciones recibidas por un usuario.
 *
 * @param {import('express').Request} req - Solicitud HTTP que contiene el identificador del usuario en `req.params.id`.
 * @param {import('express').Response} res - Respuesta HTTP con la lista de valoraciones del usuario.
 * @returns {Promise<void>} Finaliza la respuesta HTTP con las valoraciones encontradas.
 * @throws {Error} Si ocurre un error al consultar las valoraciones.
 */
const obtenerValoracionesUsuario = async (req, res) => {
    const { id } = req.params;
    const valoraciones = await obtenerValoraciones(id);
    res.json({ message: 'Valoraciones del usuario obtenidas correctamente', valoraciones });
}

/**
 * Publica una valoración dirigida a otro usuario.
 *
 * @param {import('express').Request} req - Solicitud HTTP con el emisor autenticado en `req.usuario`, el receptor en `req.params.id` y los datos en `req.body`.
 * @param {import('express').Response} res - Respuesta HTTP con el identificador de la valoración creada.
 * @returns {Promise<void>} Finaliza la respuesta HTTP después de publicar la valoración.
 * @throws {Error} Si ocurre un error al insertar la valoración.
 */
const publicarValoracionUsuario = async (req, res) => {
    const { puntuacion, comentario } = req.body;
    const id = await publicarValoracion({ emisor_id: req.usuario.id, receptor_id: req.params.id, puntuacion, comentario });
    const valoracion = obtenerValoracionPorId(id)
    res.json({ message: 'Valoración publicada correctamente', valoracion });
}

const borrarValoracionPorId = async ( req, res ) => {
    const { id } = req.params;
    const valoracion = await obtenerValoracionPorId(id)
    await borrarValoracion(id)
    res.json({ message: 'Valoracion borrada correctamente', valoracion })
}

export { obtenerValoracionesUsuario, publicarValoracionUsuario, borrarValoracionPorId }
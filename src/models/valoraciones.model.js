import db from '../config/db.js';

/**
 * Obtiene todas las valoraciones recibidas por un usuario.
 *
 * @param {number|string} id - Identificador del usuario receptor.
 * @returns {Promise<Object[]>} Lista de valoraciones recibidas por el usuario.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const obtenerValoraciones = async (id) => {
    const [result] = await db.execute('SELECT * FROM valoraciones WHERE receptor_id = ?', [id]);
    return result;
}

const obtenerValoracionPorId = async (id) => {
    const [result] = await db.execute('SELECT * FROM valoraciones WHERE id = ?', [id])
    if (result.length === 0) return null;
    return result[0]
}

/**
 * Publica una nueva valoración dirigida a un usuario.
 *
 * @param {Object} datos - Datos de la valoración.
 * @param {number|string} datos.emisor_id - Identificador del usuario que publica la valoración.
 * @param {number|string} datos.receptor_id - Identificador del usuario que recibe la valoración.
 * @param {number} datos.puntuacion - Puntuación otorgada al usuario receptor.
 * @param {string|null} datos.comentario - Comentario opcional asociado a la valoración.
 * @returns {Promise<number>} Identificador generado para la nueva valoración.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const publicarValoracion = async ({emisor_id, receptor_id, puntuacion, comentario}) => {
    const [result] = await db.execute('INSERT INTO valoraciones (emisor_id, receptor_id, puntuacion, comentario) VALUES (?, ?, ?, ?)', [emisor_id, receptor_id, puntuacion, comentario]);
    return result.insertId;
}

const borrarValoracion = async  (id) => {
    const [result] = await db.execute('DELETE FROM valoraciones WHERE id = ?', [id])
    return result
}


export { obtenerValoraciones, publicarValoracion, borrarValoracion, obtenerValoracionPorId }
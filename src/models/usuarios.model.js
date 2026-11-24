import db from '../config/db.js';

/**
 * Obtiene un usuario mediante su identificador.
 *
 * @param {number|string} id - Identificador del usuario.
 * @returns {Promise<Object|null>} Usuario encontrado o `null` si no existe.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const obtenerUsuarioPorId = async (id) => {
    const [result] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (result.length === 0) return null;
    return result[0];
}

/**
 * Actualiza los datos editables de un usuario.
 *
 * @param {number|string} id - Identificador del usuario a actualizar.
 * @param {Object} datos - Datos que reemplazarán los campos editables.
 * @param {string} datos.nombre - Nombre del usuario.
 * @param {string} datos.apellidos - Apellidos del usuario.
 * @param {string} datos.username - Nombre público del usuario.
 * @param {string} datos.email - Correo electrónico del usuario.
 * @param {string|null} datos.foto - URL o ruta de la foto del usuario.
 * @returns {Promise<Object>} Resultado devuelto por la operación de actualización.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const actualizarUsuario = async (id, {nombre, apellidos, username, email, foto,}) => {
    const [result] = await db.execute('UPDATE usuarios SET nombre = ?, apellidos = ?, username = ?, email = ?, foto = ? WHERE id = ?', [nombre, apellidos, username, email, foto, id]);
    return result;
}

/**
 * Desactiva un usuario sin eliminarlo físicamente.
 *
 * @param {number|string} id - Identificador del usuario a desactivar.
 * @returns {Promise<Object>} Resultado devuelto por la operación de actualización.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const borrarUsuario = async (id) => {
    const [result] = await db.execute('UPDATE usuarios SET esta_activo = 0 WHERE id = ?', [id]);
    return result;
}

/**
 * Inserta un nuevo usuario en la base de datos.
 *
 * @param {Object} datos - Datos del usuario que se insertará.
 * @param {string} datos.nombre - Nombre del usuario.
 * @param {string} datos.apellidos - Apellidos del usuario.
 * @param {string} datos.username - Nombre público del usuario.
 * @param {string} datos.email - Correo electrónico del usuario.
 * @param {string} datos.password - Contraseña cifrada del usuario.
 * @param {string|null} datos.foto - URL o ruta de la foto del usuario.
 * @param {string|null} datos.localizacion - Localización del usuario.
 * @param {string|null} datos.codigo_postal - Código postal del usuario.
 * @returns {Promise<number>} Identificador generado para el nuevo usuario.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const insertarUsuario = async ({nombre, apellidos, username, email, password, foto, localizacion, codigo_postal}) => {
    const [result] = await db.execute('INSERT INTO usuarios (nombre, apellidos, username, email, password, foto, localizacion, codigo_postal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, username, email, password, foto, localizacion, codigo_postal]);
    return result.insertId

}

/**
 * Obtiene un usuario mediante su correo electrónico.
 *
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Promise<Object|null>} Usuario encontrado o `null` si no existe.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const obtenerUsuarioPorEmail = async (email) => {
    const [result] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (result.length === 0) return null;
    return result[0];
}

/**
 * Cambia el estado activo de un usuario.
 *
 * @param {number|string} id - Identificador del usuario.
 * @param {number|string} estado - Nuevo estado activo del usuario.
 * @returns {Promise<Object>} Resultado devuelto por la operación de actualización.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const cambiarEstado = async (id, estado) => {
    const [result] = await db.execute('UPDATE usuarios SET esta_activo = ? WHERE id = ?', [estado, id]);
    return result;
}

/**
 * Cambia el rol asignado a un usuario.
 *
 * @param {number|string} id - Identificador del usuario.
 * @param {string} rol - Nuevo rol del usuario.
 * @returns {Promise<Object>} Resultado devuelto por la operación de actualización.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const cambiarRol = async (id, rol) => {
    const [result] = await db.execute('UPDATE usuarios SET rol = ? WHERE id = ?', [rol, id]);
    return result;
}

/**
 * Obtiene todos los artículos publicados por un usuario.
 *
 * @param {number|string} id - Identificador del usuario vendedor.
 * @returns {Promise<Object[]>} Lista de artículos asociados al usuario.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const obtenerArticulos = async (id) => {
    const [result] = await db.execute('SELECT * FROM articulos WHERE vendedor_id = ?', [id]);
    return result;
}


export { insertarUsuario, obtenerUsuarioPorEmail, obtenerUsuarioPorId, actualizarUsuario, borrarUsuario, cambiarEstado, cambiarRol, obtenerArticulos };
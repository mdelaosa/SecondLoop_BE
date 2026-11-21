import { obtenerValoracionPorId } from "../models/valoraciones.model.js"

/**
 * Comprueba que la valoración identificada por el parámetro de ruta existe.
 *
 * @param {import('express').Request} req - Solicitud HTTP que contiene el identificador de la valoración en `req.params.id`.
 * @param {import('express').Response} res - Respuesta HTTP utilizada para devolver un error si la valoración no existe.
 * @param {import('express').NextFunction} next - Función que continúa con el siguiente middleware o controlador.
 * @returns {Promise<void>} Continúa con la solicitud o finaliza la respuesta si la valoración no existe.
 * @throws {Error} Si ocurre un error al consultar la valoración.
 */
const checkValoracionId = async (req, res, next) => {
    const { id } = req.params
    const valoracion = await obtenerValoracionPorId(id)

    if(!valoracion) {
        return res.status(404).json({ message: 'Valoracion no encontrada' })
    }
    next()
}

export { checkValoracionId }
import { obtenerValoracionPorId } from "../models/valoraciones.model.js"

const checkValoracionId = async (req, res, next) => {
    const { id } = req.params
    const valoracion = await obtenerValoracionPorId(id)

    if(!valoracion) {
        return res.status(404).json({ message: 'Valoracion no encontrada' })
    }
    next()
}

export { checkValoracionId }
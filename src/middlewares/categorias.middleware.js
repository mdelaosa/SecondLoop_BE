import { selectById } from "../models/categorias.model.js";

// Middleware que comprueba si el idCategoria existe en la BD
const checkId = async (req, res, next) => {
    const { idCategoria } = req.params;

    const categoria = await selectById(idCategoria);
    if (!categoria) {
        return res.status(404).json({
            message: 'No existe una categoria con ese ID'
        });
    }

    // Incluimos el objeto categoria dentro de la petición
    req.categoria = categoria;

    next();
}

export {
    checkId
}
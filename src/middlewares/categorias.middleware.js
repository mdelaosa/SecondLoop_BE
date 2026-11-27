import { selectById, selectByNombre } from "../models/categorias.model.js";

// Middleware que comprueba si el idCategoria es válido y existe en la BD
const checkId = async (req, res, next) => {
    const { idCategoria } = req.params;

    if (isNaN(Number(idCategoria))) {
        return res.status(400).json({
            message: 'El ID de la categoría debe ser un número válido'
        });
    }

    try {
        const categoria = await selectById(idCategoria);
        if (!categoria) {
            return res.status(404).json({
                message: 'No existe una categoría con ese ID'
            });
        }

        // Incluimos el objeto categoria dentro de la petición
        req.categoria = categoria;

        next();
    } catch (error) {
        next(error);
    }
};

// Middleware que valida que el nombre venga relleno y no esté duplicado
const validarCategoria = async (req, res, next) => {
    const { nombre } = req.body || {};
    const { idCategoria } = req.params;

    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({
            message: 'El nombre de la categoría es obligatorio.'
        });
    }

    const nombreLimpio = nombre.trim();

    try {
        const categoriaExistente = await selectByNombre(nombreLimpio);

        // Si existe otra categoría con ese nombre y no es la misma que estamos editando
        if (categoriaExistente && categoriaExistente.id !== Number(idCategoria)) {
            return res.status(400).json({
                message: 'Ya existe una categoría con ese nombre.'
            });
        }

        req.body.nombre = nombreLimpio;
        next();
    } catch (error) {
        next(error);
    }
};

export {
    checkId,
    validarCategoria
};

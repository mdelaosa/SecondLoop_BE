import { deleteById, insert, selectAll, selectById, updateById } from "../models/categorias.model.js"

const getAll = async (req, res) => {
    const categorias = await selectAll();
    console.log(categorias);
    res.json(categorias);
}

const getById = async (req, res) => {
    res.json(req.categoria);
}

const create = async (req, res) => {
    const result = await insert(req.body);
    // En la respuesta del insert recibimos la propiedad insertId
    const categoria = await selectById(result.insertId);
    res.json(categoria);
}

const edit = async (req, res) => {
    // En req.body -> datos nuevos de la categoria
    // En req.params.idCategoria -> el id de la categoria a actualizar
    const { idCategoria } = req.params;

    await updateById(idCategoria, req.body);
    // Recuperar la categoria actualizada
    const categoria = await selectById(idCategoria);
    res.json(categoria);
}

const remove = async (req, res) => {
    const { idCategoria } = req.params;

    try {
        await deleteById(idCategoria);
        res.json(categoria);
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({
                message: 'No se puede eliminar la categoría porque tiene artículos asociados.'
            });
        }
//        next(error);
    }

}

export {
    getAll, getById, create, edit, remove
}

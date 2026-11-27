import { deleteById, insert, selectAll, selectById, updateById } from "../models/categorias.model.js";

const getAll = async (req, res, next) => {
    try {
        const categorias = await selectAll();
        return res.json(categorias);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res) => {
    return res.json(req.categoria);
};

const create = async (req, res, next) => {
    try {
        const result = await insert(req.body);
        const categoria = await selectById(result.insertId);
        return res.status(201).json(categoria);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Ya existe una categoría con ese nombre.' });
        }
        next(error);
    }
};

const edit = async (req, res, next) => {
    const { idCategoria } = req.params;

    try {
        await updateById(idCategoria, req.body);
        const categoria = await selectById(idCategoria);
        return res.json(categoria);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Ya existe una categoría con ese nombre.' });
        }
        next(error);
    }
};

const remove = async (req, res, next) => {
    const { idCategoria } = req.params;

    try {
        await deleteById(idCategoria);
        return res.json(req.categoria);
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({
                message: 'No se puede eliminar la categoría porque tiene artículos asociados.'
            });
        }
        next(error);
    }
};

export {
    getAll, getById, create, edit, remove
};

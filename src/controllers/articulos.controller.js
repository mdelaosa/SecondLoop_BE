import { selectAll, selectById, selectPropios, insert, updateById, updateEstadoById, deleteById,
    insertFotos, deleteFotoById, selectFavoritosByUsuario, conmutaFavorito} from '../models/articulos.model.js';

const getAll = async (req, res, next) => {
    try {
        const articulos = await selectAll(req.query);
        return res.json(articulos);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res) => {
    return res.json(req.articulo);
};

const create = async (req, res, next) => {
    const { imagenes } = req.body;

    try {
        const result = await insert({
            ...req.body,
            vendedor_id: req.usuario.id
        });

        const nuevoId = result.insertId;

        if (Array.isArray(imagenes) && imagenes.length > 0) {
            const urlsValidas = imagenes.filter((url) => typeof url === 'string' && url.trim().length > 0);
            if (urlsValidas.length > 0) {
                await insertFotos(nuevoId, urlsValidas);
            }
        }

        const articuloCreado = await selectById(nuevoId);
        return res.status(201).json(articuloCreado);
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'La categoría indicada no existe.' });
        }
        next(error);
    }
};

const getPropios = async (req, res, next) => {
    const { estado } = req.query;

    try {
        const articulos = await selectPropios(req.usuario.id, estado);
        return res.json(articulos);
    } catch (error) {
        next(error);
    }
};

const edit = async (req, res, next) => {
    const { idArticulo } = req.params;

    try {
        await updateById(idArticulo, req.body);
        const articuloActualizado = await selectById(idArticulo);
        return res.json(articuloActualizado);
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'La categoría indicada no existe.' });
        }
        next(error);
    }
};

const updateEstado = async (req, res, next) => {
    const { idArticulo } = req.params;

    try {
        await updateEstadoById(idArticulo, req.body);
        const articuloActualizado = await selectById(idArticulo);
        return res.json(articuloActualizado);
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'El comprador_id indicado no existe.' });
        }
        next(error);
    }
};

const remove = async (req, res, next) => {
    const { idArticulo } = req.params;

    try {
        await deleteById(idArticulo);
        return res.json(req.articulo);
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({
                message: 'No se puede eliminar físicamente el artículo porque tiene reportes asociados. Puedes cambiar su estado a RETIRADO.'
            });
        }
        next(error);
    }
};

const addFotos = async (req, res, next) => {
    const { idArticulo } = req.params;

    try {
        const fotosActualizadas = await insertFotos(idArticulo, req.listaUrls);
        return res.status(201).json(fotosActualizadas);
    } catch (error) {
        next(error);
    }
};

const removeFoto = async (req, res, next) => {
    const { idArticulo, idFoto } = req.params;

    if (isNaN(Number(idFoto))) {
        return res.status(400).json({ message: 'El ID de la foto debe ser un número válido.' });
    }

    try {
        const result = await deleteFotoById(idArticulo, idFoto);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Foto no encontrada en este artículo.' });
        }

        return res.json({ fotoId: Number(idFoto) });
    } catch (error) {
        next(error);
    }
};

const getFavoritos = async (req, res, next) => {
    try {
        const favoritos = await selectFavoritosByUsuario(req.usuario.id);
        return res.json(favoritos);
    } catch (error) {
        next(error);
    }
};

const toggleFavorito = async (req, res, next) => {
    const { idArticulo } = req.params;

    try {
        const isFavorite = await conmutaFavorito(req.usuario.id, idArticulo);
        return res.json({
            articuloId: Number(idArticulo),
            isFavorite
        });
    } catch (error) {
        next(error);
    }
};

export { getAll, getById, getPropios, create, edit, updateEstado, remove, addFotos, removeFoto, getFavoritos, toggleFavorito};

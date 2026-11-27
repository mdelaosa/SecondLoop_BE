import db from '../config/db.js';

const selectAll = async () => {
    const [result] = await db.execute('SELECT * FROM categorias ORDER BY nombre ASC');
    return result;
};

const selectById = async (idCategoria) => {
    const [result] = await db.execute(
        'SELECT * FROM categorias WHERE id = ?',
        [idCategoria]
    );
    if (result.length === 0) {
        return null;
    }
    return result[0];
};

const selectByNombre = async (nombre) => {
    const [result] = await db.execute(
        'SELECT * FROM categorias WHERE nombre = ?',
        [nombre]
    );
    if (result.length === 0) {
        return null;
    }
    return result[0];
};

const insert = async ({ nombre }) => {
    const [result] = await db.execute(
        'INSERT INTO categorias (nombre) VALUES (?)',
        [nombre]
    );
    return result;
};

const updateById = async (idCategoria, { nombre }) => {
    const [result] = await db.execute(
        'UPDATE categorias SET nombre = ? WHERE id = ?',
        [nombre, idCategoria]
    );
    return result;
};

const deleteById = async (idCategoria) => {
    const [result] = await db.execute(
        'DELETE FROM categorias WHERE id = ?',
        [idCategoria]
    );
    return result;
};

export {
    selectAll, selectById, selectByNombre, insert, updateById, deleteById
};

import db from '../config/db.js';

const selectAll = async () => {
    const [result] = await db.execute('select * from categorias');
    console.log(result);
    return result;
}

const selectById = async (idCategoria) => {

    const [result] = await db.execute(
        'select * from categorias where id = ?',
        [idCategoria]
    );
    if (result.length === 0) {
        return null;
    }
    return result[0];
}

const insert = async ({ nombre }) => {
    const [result] = await db.execute(
        'insert into categorias (nombre) values (?)',
        [nombre]
    );
    return result;
}

const updateById = async (idCategoria, { nombre }) => {
    const [result] = await db.execute(
        'update categorias set nombre = ? where id = ?',
        [nombre, idCategoria]
    );
    return result;
}

const deleteById = async (idCategoria) => {
    const [result] = await db.execute(
        'delete from categorias where id = ?',
        [idCategoria]
    );
    return result;
}

export {
    selectAll, selectById, insert, updateById, deleteById
}
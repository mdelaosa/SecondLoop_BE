import db from '../config/db.js';

// Lista artículos PUBLICADOS aplicando filtros opcionales por query params

const selectAll = async (filtros = {}) => {
    let sql = `
        SELECT 
            a.id, a.titulo, a.descripcion, a.precio, a.talla, a.genero, a.marca,
            a.estado_conservacion, a.estado, a.publicado_en, a.vendido_en,
            a.categoria_id, c.nombre AS categoria_nombre,
            a.vendedor_id, u.username AS vendedor_username, u.localizacion, u.codigo_postal
        FROM articulos a
        INNER JOIN categorias c ON a.categoria_id = c.id
        INNER JOIN usuarios u ON a.vendedor_id = u.id
        WHERE a.estado = 'PUBLICADO' AND u.esta_activo = 1
    `;
    const params = [];

    if (filtros.titulo) {
        sql += ' AND a.titulo LIKE ?';
        params.push(`%${filtros.titulo}%`);
    }

    if (filtros.descripcion) {
        sql += ' AND a.descripcion LIKE ?';
        params.push(`%${filtros.descripcion}%`);
    }

    if (filtros.categoria_id) {
        sql += ' AND a.categoria_id = ?';
        params.push(filtros.categoria_id);
    }

    if (filtros.talla) {
        sql += ' AND a.talla = ?';
        params.push(filtros.talla);
    }

    if (filtros.genero) {
        sql += ' AND a.genero = ?';
        params.push(filtros.genero);
    }

    if (filtros.marca) {
        sql += ' AND a.marca LIKE ?';
        params.push(`%${filtros.marca}%`);
    }

    if (filtros.estado_conservacion) {
        sql += ' AND a.estado_conservacion = ?';
        params.push(filtros.estado_conservacion);
    }

    if (filtros.precio) {
        sql += ' AND a.precio <= ?';
        params.push(filtros.precio);
    }

    if (filtros.codigo_postal) {
        sql += ' AND u.codigo_postal = ?';
        params.push(filtros.codigo_postal);
    }

    sql += ' ORDER BY a.publicado_en DESC';

    const [articulos] = await db.execute(sql, params);

    // Adjuntamos el array de fotos a cada artículo
    for (const articulo of articulos) {
        articulo.fotos = await selectFotosByArticulo(articulo.id);
    }

    return articulos;
};

// Lista todos los artículos del vendedor autenticado (con filtro opcional por estado)

const selectPropios = async (vendedorId, estado = null) => {
    let sql = `
        SELECT 
            a.id, a.titulo, a.descripcion, a.precio, a.talla, a.genero, a.marca,
            a.estado_conservacion, a.estado, a.publicado_en, a.vendido_en,
            a.categoria_id, c.nombre AS categoria_nombre,
            a.vendedor_id, a.comprador_id
        FROM articulos a
        INNER JOIN categorias c ON a.categoria_id = c.id
        WHERE a.vendedor_id = ?
    `;
    const params = [vendedorId];

    if (estado) {
        sql += ' AND a.estado = ?';
        params.push(estado);
    }

    sql += ' ORDER BY a.publicado_en DESC';

    const [articulos] = await db.execute(sql, params);

    for (const articulo of articulos) {
        articulo.fotos = await selectFotosByArticulo(articulo.id);
    }

    return articulos;
};

// Obtiene un artículo por ID incluyendo datos del vendedor, categoría y su array de fotos

const selectById = async (idArticulo) => {
    const [result] = await db.execute(
        `SELECT 
            a.*, 
            c.nombre AS categoria_nombre,
            u.nombre AS vendedor_nombre, u.username AS vendedor_username, 
            u.foto AS vendedor_foto, u.localizacion, u.codigo_postal
        FROM articulos a
        INNER JOIN categorias c ON a.categoria_id = c.id
        INNER JOIN usuarios u ON a.vendedor_id = u.id
        WHERE a.id = ?`,
        [idArticulo]
    );

    if (result.length === 0) {
        return null;
    }

    const articulo = result[0];

    // Adjuntamos todas sus fotos
    const [fotos] = await db.execute(
        'SELECT id, imagen FROM fotos WHERE articulo_id = ? ORDER BY id ASC',
        [idArticulo]
    );
    articulo.fotos = fotos;

    return articulo;
};

//Crea un nuevo artículo

const insert = async ({ titulo, descripcion, precio, talla, genero, marca = null, estado_conservacion, estado = 'BORRADOR', categoria_id, vendedor_id }) => {
    const [result] = await db.execute(
        `INSERT INTO articulos 
        (titulo, descripcion, precio, talla, genero, marca, estado_conservacion, estado, categoria_id, vendedor_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [titulo, descripcion, precio, talla, genero, marca, estado_conservacion, estado, categoria_id, vendedor_id]
    );
    return result;
};

// Actualiza los datos editables de un artículo

const updateById = async (idArticulo, { titulo, descripcion, precio, talla, genero, marca = null, estado_conservacion, categoria_id }) => {
    const [result] = await db.execute(
        `UPDATE articulos 
        SET titulo = ?, descripcion = ?, precio = ?, talla = ?, genero = ?, marca = ?, estado_conservacion = ?, categoria_id = ?
        WHERE id = ?`,
        [titulo, descripcion, precio, talla, genero, marca, estado_conservacion, categoria_id, idArticulo]
    );
    return result;
};

// Cambia el estado de publicación, comprador_id y fecha vendido_en si pasa a VENDIDO

const updateEstadoById = async (idArticulo, { estado, comprador_id = null }) => {
    const sql = estado === 'VENDIDO'
        ? 'UPDATE articulos SET estado = ?, comprador_id = ?, vendido_en = NOW() WHERE id = ?'
        : 'UPDATE articulos SET estado = ?, comprador_id = NULL, vendido_en = NULL WHERE id = ?';

    const params = estado === 'VENDIDO'
        ? [estado, comprador_id, idArticulo]
        : [estado, idArticulo];

    const [result] = await db.execute(sql, params);
    return result;
};

//Elimina un artículo por ID

const deleteById = async (idArticulo) => {
    const [result] = await db.execute(
        'DELETE FROM articulos WHERE id = ?',
        [idArticulo]
    );
    return result;
};

// --- GESTIÓN DE FOTOS ---

const selectFotosByArticulo = async (idArticulo) => {
    const [result] = await db.execute(
        'SELECT id, imagen FROM fotos WHERE articulo_id = ? ORDER BY id ASC',
        [idArticulo]
    );
    return result;
};

const insertFotos = async (idArticulo, urls) => {
    const values = urls.map((url) => [url.trim(), idArticulo]);
    await db.query('INSERT INTO fotos (imagen, articulo_id) VALUES ?', [values]);
    return selectFotosByArticulo(idArticulo);
};

const deleteFotoById = async (idArticulo, idFoto) => {
    const [result] = await db.execute(
        'DELETE FROM fotos WHERE id = ? AND articulo_id = ?',
        [idFoto, idArticulo]
    );
    return result;
};

// --- GESTIÓN DE FAVORITOS ---

const selectFavoritosByUsuario = async (usuarioId) => {
    const [articulos] = await db.execute(
        `SELECT 
            a.id, a.titulo, a.descripcion, a.precio, a.talla, a.genero, a.marca,
            a.estado_conservacion, a.estado, a.publicado_en,
            a.categoria_id, c.nombre AS categoria_nombre,
            a.vendedor_id, u.username AS vendedor_username, u.localizacion
        FROM favoritos fav
        INNER JOIN articulos a ON fav.articulo_id = a.id
        INNER JOIN categorias c ON a.categoria_id = c.id
        INNER JOIN usuarios u ON a.vendedor_id = u.id
        WHERE fav.usuario_id = ? AND a.estado = 'PUBLICADO'
        ORDER BY a.publicado_en DESC`,
        [usuarioId]
    );

    for (const articulo of articulos) {
        articulo.fotos = await selectFotosByArticulo(articulo.id);
    }

    return articulos;
};


const conmutaFavorito = async (usuarioId, idArticulo) => {
    const [existing] = await db.execute(
        'SELECT usuario_id FROM favoritos WHERE usuario_id = ? AND articulo_id = ?',
        [usuarioId, idArticulo]
    );

    if (existing.length > 0) {
        await db.execute(
            'DELETE FROM favoritos WHERE usuario_id = ? AND articulo_id = ?',
            [usuarioId, idArticulo]
        );
        return false;
    } else {
        await db.execute(
            'INSERT INTO favoritos (usuario_id, articulo_id) VALUES (?, ?)',
            [usuarioId, idArticulo]
        );
        return true;
    }
};

export { selectAll, selectById, selectPropios, insert, updateById, updateEstadoById, deleteById, selectFotosByArticulo, insertFotos, deleteFotoById, selectFavoritosByUsuario, conmutaFavorito};

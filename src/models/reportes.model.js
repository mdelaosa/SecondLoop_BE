import db from '../config/db.js';

const crearReporte = async ({motivo, detalle, usuario_reportado_id = null, emisor_id, articulo_id = null}) => {
    const [result] = await db.execute('INSERT INTO reportes (motivo, detalle, estado, usuario_reportado_id, emisor_id, articulo_id) VALUES (?, ?, "PENDIENTE", ?, ?, ?)' , [motivo, detalle, usuario_reportado_id, emisor_id, articulo_id])
    return result.insertId
}

const obtenerReportePorId = async(id) => {
    const [result] = await db.execute('SELECT * FROM reportes WHERE id = ?', [id]);
    if (result.length === 0 ) return null;
    return result[0]
}

const obtenerReportesPorEstado = async() => {
    const [result] = await db.execute('SELECT * FROM reportes');
    if (result.length === 0 ) return null;
    return result
}

export { crearReporte, obtenerReportePorId, obtenerReportesPorEstado }
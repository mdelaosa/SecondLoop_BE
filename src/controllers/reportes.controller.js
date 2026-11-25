import { crearReporte, obtenerReportePorId, obtenerReportesPorEstado } from "../models/reportes.model.js";

const publicarReporte = async (req, res) => {
    const { motivo, detalle, usuario_reportado_id, articulo_id } = req.body;
    const id = await crearReporte({motivo, detalle, usuario_reportado_id, emisor_id: req.usuario.id, articulo_id})
    const reporte = await obtenerReportePorId(id)
    res.status(201).json({message: 'Reporte publicado correctamente', reporte})
}

const obtenerReportes = async (req, res) => {
    const reportes = await obtenerReportesPorEstado()
    res.json({message: 'Reportes obtenidos', reportes})
}

export { publicarReporte, obtenerReportes }
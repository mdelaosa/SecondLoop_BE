import { Router } from 'express';
import { obtenerReportes, publicarReporte } from '../controllers/reportes.controller.js';
import { authToken } from '../middlewares/auth.middleware.js';
import { checkRol } from '../middlewares/usuarios.middleware.js';

const router = Router();

router.post('/', authToken, publicarReporte)
router.get('/', authToken, checkRol(['ADMINISTRADOR', 'MODERADOR']), obtenerReportes)

export default router
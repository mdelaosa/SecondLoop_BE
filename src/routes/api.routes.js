import { Router } from 'express';

import usuariosRoutes from './usuarios.routes.js';
import authRoutes from './auth.routes.js';
import valoracionesRoutes from './valoraciones.routes.js'
import reportesRoutes from './reportes.routes.js'


const router = Router();

router.use('/usuarios', usuariosRoutes);
router.use('/auth', authRoutes);
router.use('/valoraciones', valoracionesRoutes)
router.use('/reportes', reportesRoutes)

export default router;
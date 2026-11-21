import { Router } from 'express';

import usuariosRoutes from './usuarios.routes.js';
import authRoutes from './auth.routes.js';
import valoracionesRoutes from './valoraciones.routes.js'


const router = Router();

router.use('/usuarios', usuariosRoutes);
router.use('/auth', authRoutes);
router.use('/valoraciones', valoracionesRoutes)

export default router;